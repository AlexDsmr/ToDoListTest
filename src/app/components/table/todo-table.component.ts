import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Task } from '@interfaces/task.interface';
import { Subject, take, takeUntil } from 'rxjs';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  constructor(private taskService: TasksService) {}

  @Input() tasksProps: Task[] = [];

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  trackByFn(index, item) {
    return item.id;
  }
}
