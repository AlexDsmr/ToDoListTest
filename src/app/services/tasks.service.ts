import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, delay, Observable, retry, tap, throwError } from 'rxjs';
import { Task } from '@interfaces/task.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  apiEndpoint = environment.apiEndpoint;
  constructor(private http: HttpClient) {}

  tasks: Task[] = [];

  getAll(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.apiEndpoint + 'tasks')
      .pipe(tap((tasks) => (this.tasks = tasks)));
  }

  public getTasks(): Task[] {
    return this.tasks;
  }
}