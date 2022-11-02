import { Injectable } from '@angular/core';
import { Task } from '@interfaces/task.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor() {}
  public filteredTasks: Observable<Task[]>;
  allTasks;

  public get filter(): string {
    return JSON.parse(localStorage.getItem('filter') as string);
  }

  public set filter(value: string) {
    localStorage.setItem('filter', JSON.stringify(value));
  }

  public applyFilter(tasks: Task[]): Task[] {
    const filterValue = this.filter.toLowerCase();
    return tasks.filter((task) => task.task.toLowerCase().includes(filterValue));
  }
}
