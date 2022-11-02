import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isVisible$ = new BehaviorSubject<boolean>(false);
  taskId: number | undefined = undefined;

  open(taskId: number) {
    this.isVisible$.next(true);
    this.taskId = taskId;
  }

  close() {
    this.isVisible$.next(false);
    this.taskId = undefined;
  }
}
