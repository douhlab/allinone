import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  login() {
    this.apiService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        // store token in localStorage
        localStorage.setItem('jwt', response.token);
        this.router.navigate(['/']); // redirect to home or dashboard
      },
      error: (err) => {
        this.errorMessage = 'Invalid credentials';
        console.error(err);
      }
    });
  }
}
