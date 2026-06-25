import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  @ViewChild('captchaRef') captcha!: any;

  username = '';
  password = '';
  errorMessage = '';

  captchaToken: string | null = null;

  isLoading = false;
  successMessage = '';
  gamesOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (history.state?.registered) {
      this.successMessage = 'Registration successful! Please log in.';
    }
    if (history.state?.sessionTimeout) {
      this.successMessage = 'Session timeout! Please log in.';
    }
    if (history.state?.loggedOut) {
      this.successMessage = 'Logged out successfully';
    }
    window.history.replaceState({}, document.title);

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  toggleGames() {
    this.gamesOpen = !this.gamesOpen;
  }

  onCaptchaResolved(token: string | null) {
    if (!token) {
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
    if (!this.captchaToken) return;

    this.isLoading = true;

    this.authService.login(this.username, this.password, this.captchaToken).subscribe({
      next: (response: any) => {
        // store token in localStorage
        this.authService.setToken(response.token);
        this.router.navigate(['/app']); // redirect to home page
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
