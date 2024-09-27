import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';
import { CreateTaskRequest } from '../models/create-task.request';
import { UpdateTaskRequest } from '../models/update-task.request';
import { GetTaskRequest } from '../models/get-task.request';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=UTF-8'
  })
};

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private url = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient){}

  getAllTasks(): Observable<Array<TaskModel>> {
    return this.http.get<Array<TaskModel>>(`${this.url}/todos`);
  }

  getTask(request: GetTaskRequest): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${this.url}/todos/${request.id}`);
  }

  createNewTask(request: CreateTaskRequest): Observable<TaskModel> {
    return this.http.post<TaskModel>(`${this.url}/todos`, request, httpOptions);
  }

  updateTask(request: UpdateTaskRequest): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${this.url}/todos/${request.id}`, request, httpOptions);
  }
}
