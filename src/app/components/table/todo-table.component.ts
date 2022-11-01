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

  editingTasksIds: number[] = [];

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  addToEdit(id: number): void {
    this.editingTasksIds.push(id);
  }

  deleteFromEdit(id: number): void {
    const index = this.editingTasksIds.indexOf(id);
    if (index >= 0) this.editingTasksIds.splice(index, 1);
  }

  isEditingTask(id: number): boolean {
    return this.editingTasksIds.includes(id);
  }

  changeTaskStatus(id: number, newStatus: boolean): void {
    this.taskService
      .changeTaskStatus(id, newStatus)
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe((task) => {
        this.tasksProps.map((task) => {
          if (task.id === task.id) {
            task.isCompleted = task.isCompleted;
          }
        });
      });
  }

  trackByFn(index, item) {
    return item.id;
  }
}
