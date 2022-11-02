import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '@interfaces/task.interface';
import { Subject, takeUntil, take } from 'rxjs';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  constructor(private taskService: TasksService) {}

  form = new FormGroup({
    task: new FormControl<string>('', [Validators.required])
  });

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroyed$.next();
  }

  submit() {
    const task: Task = {
      id: Date.now(),
      task: this.form.value.task as string,
      isCompleted: false
    };
    this.taskService
      .createTask(task)
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe(() => {
        this.form.controls.task.setValue('');
      });
  }
}
