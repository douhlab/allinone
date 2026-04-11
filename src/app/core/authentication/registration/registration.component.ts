import {Component, ViewChild} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  @ViewChild('captchaRef') captcha!: any;
  captchaToken: string | null = null;

  isLoading = false;

  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  phone = '';
  firstName = '';
  lastName = '';

  constructor(private apiService: ApiService, private router: Router) {}

  get passwordStrength(): string {
    if (!this.password) return '';
    if (this.password.length < 6) return 'Weak';
    if (this.password.length < 10) return 'Medium';
    return 'Strong';
  }

  onCaptchaResolved(token: string | null) {
    if(!token) {
      this.captchaToken = null;
      return;
    }
    console.log('TOKEN:', token);
    this.captchaToken = token;
  }

  register() {
    if (!this.captchaToken) return;

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    const registrationRequest: RegistrationRequest = {
      username: this.username,
      email: this.email,
      password: this.password,
      name: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phone,
      captchaToken: this.captchaToken
    };
    this.apiService.register(registrationRequest).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login'], {
          state: { registered: true }
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message?? 'Registration failed';
        console.error(err);
      }
    });
  }

}
