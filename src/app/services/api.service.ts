import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(username: string, password: string, captchaToken: string) {
    const url = `${this.apiUrl}/simple-spa/login`;
    return this.http.post(url, { username, password, captchaToken });
  }

  getUsers(): Observable<User[]> {
    const url = `${this.apiUrl}/simple-spa/v1/api/users/all`;
    return this.http.get<User[]>(url);
  }
}
