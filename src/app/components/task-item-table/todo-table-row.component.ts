import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '@interfaces/task.interface';
import { Subject, switchMap, take, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: '[app-todo-table-row]',
  templateUrl: './todo-table-row.component.html',
  styleUrls: ['./todo-table-row.component.scss']
})
export class TodoTableRowComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  constructor(private taskService: TasksService, public modalService: ModalService) {}

  @Input() taskProps: Task;
  editMode: boolean = false;
  editingTask: Task;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  setEditMode(): void {
    this.editMode = true;
    this.editingTask = { ...this.taskProps };
  }

  cancelEditMode(): void {
    this.editMode = false;
  }

  changeTaskStatus(): void {
    if (!this.editMode) {
      const completeDate = !this.taskProps.isCompleted ? Date.now() : null;
      this.taskService
        .changeTaskStatus(this.taskProps.id, !this.taskProps.isCompleted, completeDate)
        .pipe(take(1), takeUntil(this.destroyed$))
        .subscribe((task) => {
          this.taskProps = task;
        });
    } else {
      this.editingTask.isCompleted = !this.editingTask.isCompleted;
    }
  }

  updateEditingTask(value: string) {
    this.editingTask.task = value;
  }

  acceptEdit() {
    this.taskService
      .updateTask(this.editingTask)
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe({
        next: (task) => {
          this.taskProps = task;
          this.editMode = false;
        },
        error: () => {
          this.editMode = false;
        }
      });
  }

  deleteTask() {
    this.modalService.open(this.taskProps.id, this.taskProps.task);
  }
}
