import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  private tokenKey = 'jwt';

  login(username: string, password: string) {
    return fetch(`${environment.apiUrl}/simple-spa/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(this.tokenKey, data.token);
      });
  }

  logout(): void {
    // 1. Remove the JWT from local storage
    localStorage.removeItem('jwt');

    // 2. Optionally, remove other user info
    localStorage.removeItem('user');

    // 3. Redirect to login page
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
}
