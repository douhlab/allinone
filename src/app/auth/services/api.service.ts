import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {RegistrationRequest} from "../models/registration-request";

@Injectable({providedIn: 'root'})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  register(registrationRequest: RegistrationRequest) {
    const url = `${this.apiUrl}/simple-spa/register`;
    return this.http.post(url, registrationRequest);
  }

  getUsers(): Observable<User[]> {
    const url = `${this.apiUrl}/simple-spa/v1/api/users/all`;
    return this.http.get<User[]>(url);
  }

}
