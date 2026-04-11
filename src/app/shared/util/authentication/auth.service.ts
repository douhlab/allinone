import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = environment.apiUrl;
  private TOKEN_KEY = 'jwt';

  login(username: string, password: string, captchaToken: string) {
    const url = `${this.apiUrl}/simple-spa/login`;
    return this.http.post(url, { username, password, captchaToken });
  }

  logout(): void {
    // 1. Remove the JWT from local storage
    localStorage.removeItem(this.TOKEN_KEY);

    // 2. Optionally, remove other user info
    localStorage.removeItem('user');

    // 3. Redirect to login page
    this.router.navigate(['/login'], {
      state: { loggedOut: true }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
