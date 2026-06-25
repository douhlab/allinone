import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {of, throwError} from 'rxjs';

window.history.replaceState = jest.fn();

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authService: {
    login: jest.Mock;
    setToken: jest.Mock;
    isLoggedIn: jest.Mock;
  };
  let router: { navigate: jest.Mock };

  beforeEach(async () => {
    authService = {
      login: jest.fn(),
      setToken: jest.fn(),
      isLoggedIn: jest.fn()
    };

    router = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService.isLoggedIn.mockReturnValue(false);
  });

  it('should redirect to /home if already logged in', () => {
    authService.isLoggedIn.mockReturnValue(true);

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should set success message from registration state', () => {
    Object.defineProperty(history, 'state', {
      value: { registered: true },
      configurable: true
    });

    component.ngOnInit();

    expect(component.successMessage).toBe('Registration successful! Please log in.');
    expect(window.history.replaceState).toHaveBeenCalled();
  });

  it('should set captcha token', () => {
    component.onCaptchaResolved('abc-token');
    expect(component.captchaToken).toBe('abc-token');
  });

  it('should clear captcha token when resolved with null', () => {
    component.captchaToken = 'old-token';
    component.onCaptchaResolved(null);
    expect(component.captchaToken).toBeNull();
  });

  it('should toggle games panel', () => {
    expect(component.gamesOpen).toBe(false);

    component.toggleGames();
    expect(component.gamesOpen).toBe(true);

    component.toggleGames();
    expect(component.gamesOpen).toBe(false);
  });

  it('should login successfully and navigate', () => {
    component.username = 'user1';
    component.password = 'pass';
    component.captchaToken = 'token';
    authService.login.mockReturnValue(of({ token: 'jwt-token' }));

    component.login();

    expect(authService.login).toHaveBeenCalledWith('user1', 'pass', 'token');
    expect(router.navigate).toHaveBeenCalledWith(['/app']);
    expect(component.isLoading).toBe(false);
  });

  it('should not login without captcha token', () => {
    component.captchaToken = null;

    component.login();

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should handle login error', () => {
    component.username = 'user1';
    component.password = 'pass';
    component.captchaToken = 'token';
    component.captcha = { reset: jest.fn() };
    authService.login.mockReturnValue(throwError(() => new Error('fail')));

    component.login();

    expect(component.errorMessage).toBe('Invalid credentials');
    expect(component.isLoading).toBe(false);
    expect(component.captchaToken).toBeNull();
  });
});

