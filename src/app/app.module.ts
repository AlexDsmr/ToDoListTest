import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';
import { TodoTableComponent } from './components/table/todo-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListPageComponent,
    TodoTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
