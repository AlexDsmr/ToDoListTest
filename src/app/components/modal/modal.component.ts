import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap, take, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor(public modalService: ModalService, private taskService: TasksService) {}
  @Input() title: string;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  applyFn() {
    const taskId = this.modalService.taskId;
    if (taskId) {
      this.taskService
        .deleteTask(taskId)
        .pipe(
          take(1),
          takeUntil(this.destroyed$),
          switchMap(() => {
            return this.taskService.getAll();
          })
        )
        .subscribe(() => {
          this.modalService.close();
        });
    }
  }

  cancelFn() {
    this.modalService.close();
  }
}
