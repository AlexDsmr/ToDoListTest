import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';
import { TodoTableComponent } from './components/table/todo-table.component';
import { FilterTaskComponent } from './components/filter-task/filter-task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ModalComponent } from './components/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoTableRowComponent } from './components/task-item-table/todo-table-row.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    TodoListPageComponent,
    TodoTableComponent,
    FilterTaskComponent,
    AddTaskComponent,
    ModalComponent,
    TodoTableRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
