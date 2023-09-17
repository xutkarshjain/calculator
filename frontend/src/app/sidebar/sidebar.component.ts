import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  sidebarCollapsed:boolean = false

  constructor(private localStorageService:LocalStorageService){}
  
  toggleSidebar(){
    this.sidebarCollapsed = !this.sidebarCollapsed
  }

  clearHistory(){
    this.localStorageService.clear('history')
  }
}
