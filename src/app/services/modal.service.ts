import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isVisible$ = new BehaviorSubject<boolean>(false);
  taskId: number | undefined = undefined;
  title: string | undefined = undefined;

  open(taskId: number, title: string) {
    this.isVisible$.next(true);
    this.taskId = taskId;
    this.title = title;
  }

  close() {
    this.isVisible$.next(false);
    this.taskId = undefined;
    this.title = undefined;
  }
}
