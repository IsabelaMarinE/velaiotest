import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { CreateUserModel } from '../models/create-user.request';
import { GetUserRequest } from '../models/get-user.request';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=UTF-8'
  })
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient){}

  getAllUsers(): Observable<Array<UserModel>> {
    return this.http.get<Array<UserModel>>(`${this.url}/users`);
  }

  getUser(request: GetUserRequest): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.url}/users/${request.id}`);
  }

  createNewUser(request: CreateUserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/users`, request, httpOptions);
  }

}
