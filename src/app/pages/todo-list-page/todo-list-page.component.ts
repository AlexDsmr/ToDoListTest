import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit {
  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.taskService.getAll().subscribe((res) => {
      console.log(res);
    });
  }
}
