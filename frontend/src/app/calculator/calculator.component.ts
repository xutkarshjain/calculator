import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as math from 'mathjs';
import { LocalStorageService } from 'ngx-webstorage';
import { SharedDetailsService } from '../shared-details.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  equation:string ="0"
  result:string = "0"
  editHistoryMode:boolean = false
  itemToRemoved:any = {}
  @ViewChild('editableDiv') editableDivRef!: ElementRef;

  constructor(private elementRef: ElementRef,private localStorageService:LocalStorageService, private sharedDetailsService:SharedDetailsService) {}

  ngOnInit() {
    this.registerPasteEvent();
    this.sharedDetailsService.itemToUpdate$.subscribe((itemToUpdate)=>{
      if (itemToUpdate){
        this.itemToRemoved = itemToUpdate
        this.editHistoryMode = true
        this.result = itemToUpdate.result
        const editableDiv = this.editableDivRef.nativeElement;
        editableDiv.innerText = itemToUpdate.equation;
      }
    })
  }


  validateInput(event: any) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '.', '*', '/', '%', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '(', ')' , 'Backspace'];
    
    if (event.key === 'Backspace' || event.key === 'Delete'|| event.key === 'Copy' || event.key === 'Paste' || event.ctrlKey && (event.key === 'c' || event.key === 'v' || event.key === 'a')) {
      return;
    }

    if (event.key == 'Enter'){
      this.equation = event?.target?.innerHTML
      this.result = this.calculateEquation(event?.target?.innerHTML)
    }
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  calculateEquation(equation:string) {
    try {
      let value = math.evaluate(equation);
      value = value.toString()
      if (this.equation != value){
        if (this.editHistoryMode){
          this.removeItemFromHistory(this.itemToRemoved)
          this.editHistoryMode = false
          this.itemToRemoved ={}
        }
        this.addToLocalStorage(this.equation,value)
      }
      return value.toString();
    } catch (error) {
      return 'Invalid Error!';
    }
  }

  registerPasteEvent() {
    const equationDiv = this.elementRef.nativeElement.querySelector('.equation');

    equationDiv.addEventListener('paste', (event: ClipboardEvent) => {
      event.preventDefault();
      const plainText = event.clipboardData?.getData('text/plain') || "";
      if (this.validatePastedText(plainText)) {
        this.insertTextAtCursor(plainText);
      }
      
    });
  }
  
  insertTextAtCursor(plainText: string) {
    const equationDiv = this.elementRef.nativeElement.querySelector('.equation');
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const textNode = document.createTextNode(plainText);
      range.insertNode(textNode);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      equationDiv.textContent += plainText;
    }
  }

  validatePastedText(plainText: string): boolean {
    const allowedCharacters = /^[0-9+\-.*/%()]+$/;
    return allowedCharacters.test(plainText);
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%','(', ')', '.' , 'Backspace'];
    if (allowedKeys.includes(event.key)){
      const editableDiv = this.editableDivRef.nativeElement;
      editableDiv.focus();
    }
  }

  handleKeyPress(key:string){
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%','(', ')', '.' , 'Backspace'];
    if(key == 'AC'){
      const editableDiv = this.editableDivRef.nativeElement;
      editableDiv.innerText = 0;
      this.equation = '0'
      this.result = '0'
    }

    if (key == 'Backspace'){
      const editableDiv = this.editableDivRef.nativeElement;
      const text = editableDiv.innerText;
      const newText = text.slice(0, text.length - 1);
      editableDiv.innerText = newText;
    }
    else if (key == 'Enter'){
      this.equation = this.editableDivRef.nativeElement.innerText
      console.log('equation',this.equation)
      this.result = this.calculateEquation(this.equation)
    }

    else if (allowedKeys.includes(key)){
      const editableDiv = this.editableDivRef.nativeElement;
      editableDiv.innerText += key;
    }
  }


  addToLocalStorage(equation:string,result:string){
    let value = this.localStorageService.retrieve('history') || []
    let itemToInsert:any = { equation:equation, result:result }

    if (value.length >0){
      const lastInsertedItem = value[0]
      if (JSON.stringify(lastInsertedItem) != JSON.stringify(itemToInsert)){
        value.unshift(itemToInsert)
        this.localStorageService.store('history',value)
      }
    }
    else{
      value.unshift(itemToInsert)
      this.localStorageService.store('history',value)
    }
    
  }
    
  removeItemFromHistory(itemToRemoved:any){
    let arr = this.localStorageService.retrieve('history') || []
    const foundIndex = arr.findIndex((obj:any, index:number) => {
      if (JSON.stringify(obj) === JSON.stringify(itemToRemoved)) {
        return true;
      }
      return false;
    });

    if (foundIndex != -1) {
      arr.splice(foundIndex, 1);
      this.localStorageService.store('history',arr)
    }
  }

}
