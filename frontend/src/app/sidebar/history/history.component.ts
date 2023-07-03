import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  @Input() sidebarCollapsed!:boolean;
  public historyItems:any =[
    {"equation":"12*20*90+2/2" , "result": "2753"},
    {"equation":"12+12/3*20*90+2/2" , "result": "2753"},
    {"equation":"12*20*90+2/2" , "result": "2753"},
    {"equation":"12*20*90+2/2" , "result": "2753"},
    {"equation":"12*20*90+2/2" , "result": "2753"},
    {"equation":"12*20*90+2/2" , "result": "2753"},
    {"equation":"12*20*90+2/2" , "result": "2753"},
    {"equation":"12*20*90+2/2" , "result": "2753"},
    {"equation":"12*20*90+2/2" , "result": "2753"}
  ]
}
