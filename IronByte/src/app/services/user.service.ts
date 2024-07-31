import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiUrl = 'http://localhost:8060/api/users';

  constructor(private http: HttpClient) {}


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+'/getAllUsers');

  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add_User`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update_user`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/del-user/${id}`);
  }
}
