import {Component, ViewChild} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @ViewChild('captchaRef') captcha!: any;

  username = '';
  password = '';
  errorMessage = '';

  captchaToken: string | null = null;

  isLoading = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  onCaptchaResolved(token: string | null) {
    if(!token) {
      this.captchaToken = null;
      return;
    }
    console.log('TOKEN:', token);
    this.captchaToken = token;
  }

  onLoginError() {
    this.captcha.reset();
    this.captchaToken = null;
    this.isLoading = false;
  }

  login() {
    this.isLoading = true;

    if (!this.captchaToken) return;

    this.apiService.login(this.username, this.password, this.captchaToken).subscribe({
      next: (response: any) => {
        // store token in localStorage
        localStorage.setItem('jwt', response.token);
        this.router.navigate(['/welcome']); // redirect to welcome page
      },
      error: (err) => {
        this.errorMessage = 'Invalid credentials';
        this.onLoginError();
        console.error(err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
