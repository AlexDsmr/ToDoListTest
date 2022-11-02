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

  editingTasks: Task[] = [];

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  addToEdit(task: Task): void {
    this.editingTasks.push(task);
  }

  deleteFromEdit(task: Task): void {
    const index = this.editingTasks.indexOf(task);
    if (index >= 0) this.editingTasks.splice(index, 1);
  }

  isEditingTask(task: Task): boolean {
    return this.editingTasks.includes(task);
  }

  changeTaskStatus(task: Task): void {
    if (this.isEditingTask(task)) {
      this.editingTasks.map((editingTask) => {
        if (editingTask.id === task.id) {
          editingTask.isCompleted = !task.isCompleted;
        }
      });
    } else {
      this.taskService
        .changeTaskStatus(task.id, !task.isCompleted)
        .pipe(take(1), takeUntil(this.destroyed$))
        .subscribe((task) => {
          this.tasksProps.map((task) => {
            if (task.id === task.id) {
              task.isCompleted = task.isCompleted;
            }
          });
        });
    }
  }

  updateEditingTask(value: string, task: Task) {
    this.editingTasks.map((editingTask) => {
      if (editingTask.id === task.id) {
        editingTask.task = value;
      }
    });
  }

  acceptEdit(task: Task) {
    console.log(this.editingTasks);
  }

  trackByFn(index, item) {
    return item.id;
  }
}
