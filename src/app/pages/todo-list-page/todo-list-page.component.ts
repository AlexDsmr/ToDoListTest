import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '@interfaces/task.interface';
import { Subject, take, takeUntil } from 'rxjs';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  constructor(private taskService: TasksService) {}
  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  get tasks(): Task[] {
    return this.taskService.getTasks();
  }

  ngOnInit(): void {
    this.taskService
      .getAll()
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe(() => {});
  }
}
