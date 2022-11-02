import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '@interfaces/task.interface';
import { Subject, take, takeUntil } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';
import { ModalService } from 'src/app/services/modal.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  constructor(
    private taskService: TasksService,
    public modalService: ModalService,
    private filterService: FilterService
  ) {}
  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  get tasks(): Task[] {
    let tasks = this.taskService.getTasks();
    return this.filterService.applyFilter(tasks);
  }

  ngOnInit(): void {
    this.taskService
      .getAll()
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe(() => {});
  }
}
