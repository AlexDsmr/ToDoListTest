import { Component, OnInit } from '@angular/core';
import { Task } from '@interfaces/task.interface';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit {
  constructor(private taskService: TasksService) {}

  get tasks(): Task[] {
    return this.taskService.getTasks();
  }

  ngOnInit(): void {
    this.taskService.getAll().subscribe((res) => {
      console.log(res);
    });
  }
}
