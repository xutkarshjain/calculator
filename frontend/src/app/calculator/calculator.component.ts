import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  equation:string ="0"
  result:string = "0"
  @ViewChild('editableDiv') editableDivRef!: ElementRef;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.registerPasteEvent();
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
      const value = math.evaluate(equation);
      return value.toString();
    } catch (error) {
      this.result = 'Syntax Error!';
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
  

}
