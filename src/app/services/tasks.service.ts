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
  prepareUrl = this.apiEndpoint + 'tasks';
  constructor(private http: HttpClient) {}

  tasks: Task[] = [];

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.prepareUrl).pipe(tap((tasks) => (this.tasks = tasks)));
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.prepareUrl, task).pipe(
      tap((task) => {
        this.tasks.push(task);
      })
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.prepareUrl + `/${task.id}`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(this.prepareUrl + `/${taskId}`);
  }

  changeTaskStatus(id: number, newStatus: boolean, completeDate: number | null): Observable<Task> {
    const body = {
      isCompleted: newStatus,
      completeDate: completeDate
    };
    return this.http.patch<Task>(this.prepareUrl + `/${id}`, body);
  }

  public getTasks(): Task[] {
    return this.tasks;
  }
}
