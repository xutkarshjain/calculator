import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ThemeComponent } from './theme/theme.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HistoryComponent } from './sidebar/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ThemeComponent,
    SidebarComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
