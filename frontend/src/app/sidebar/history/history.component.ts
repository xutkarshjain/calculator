import { Component, Input } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  @Input() sidebarCollapsed!:boolean;
  historyItems:any =[]

  constructor(private localStorageService:LocalStorageService){}

  ngOnInit(){
    this.historyItems = this.getAllHistoryData()

    this.localStorageService.observe('history').subscribe((newValue) => {
      this.historyItems = newValue
    })
  }
  
  getAllHistoryData(){
    if (this.localStorageService.retrieve('history')){
      return this.localStorageService.retrieve('history')
    }
  }
  
}
