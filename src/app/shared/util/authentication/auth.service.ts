import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../../domain/authentication/login-response";
import {BehaviorSubject, tap} from "rxjs";
import {User} from "../../domain/authentication/user";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private apiUrl = environment.apiUrl;
  private TOKEN_KEY = 'jwt';

  login(username: string, password: string, captchaToken: string) {
    const url = `${this.apiUrl}/simple-spa/login`;
    return this.http.post<LoginResponse>(url, { username, password, captchaToken }).pipe(
      tap(res => {
        this.setToken(res.token);
        this.setUser(res.user);
      })
    );
  }

  logout(): void {
    // 1. Remove the JWT from local storage
    localStorage.removeItem(this.TOKEN_KEY);

    // 2. Optionally, remove other user info
    localStorage.removeItem('user');

    // 3. Remove user info from BehaviorSubject
    this.userSubject.next(null);

    // 4. Redirect to login page
    this.router.navigate(['/auth/login'], {
      state: { loggedOut: true }
    });
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  private loadUserFromStorage() {
    const raw = localStorage.getItem('user');
    if(raw) {
      this.userSubject.next(JSON.parse(raw));
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
