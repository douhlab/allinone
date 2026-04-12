import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {of, throwError} from "rxjs";
import {FormsModule} from "@angular/forms";

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  let apiService: any;
  let router: any;

  beforeEach(async () => {
    apiService = {
      register: jest.fn()
    };

    router = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;

    // mock ViewChild captcha
    component.captcha = { reset: jest.fn() } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return Weak password strength', () => {
    component.password = '123';

    expect(component.passwordStrength).toBe('Weak');
  });

  it('should return Medium password strength', () => {
    component.password = '123456789';

    expect(component.passwordStrength).toBe('Medium');
  });

  it('should return Strong password strength', () => {
    component.password = '12345678901';

    expect(component.passwordStrength).toBe('Strong');
  });

  it('should set captcha token', () => {
    component.onCaptchaResolved('token-123');

    expect(component.captchaToken).toBe('token-123');
  });

  it('should reset captcha token when null', () => {
    component.captchaToken = 'old';

    component.onCaptchaResolved(null);

    expect(component.captchaToken).toBeNull();
  });

  it('should not register when passwords do not match', () => {
    component.password = '123456';
    component.confirmPassword = '999999';
    component.captchaToken = 'token';

    component.register();

    expect(component.errorMessage).toBe('Passwords do not match');
    expect(apiService.register).not.toHaveBeenCalled();
  });

  it('should not register when captcha is missing', () => {
    component.password = '123456';
    component.confirmPassword = '123456';
    component.captchaToken = null;

    component.register();

    expect(apiService.register).not.toHaveBeenCalled();
  });

  it('should register successfully and navigate to login', () => {
    component.username = 'user1';
    component.email = 'test@mail.com';
    component.password = '123456';
    component.confirmPassword = '123456';
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.phone = '123';
    component.captchaToken = 'token';

    apiService.register.mockReturnValue(of({}));

    component.register();

    expect(apiService.register).toHaveBeenCalled();

    expect(router.navigate).toHaveBeenCalledWith(['/login'], {
      state: { registered: true }
    });
  });

  it('should handle registration error', () => {
    component.password = '123456';
    component.confirmPassword = '123456';
    component.captchaToken = 'token';

    apiService.register.mockReturnValue(
      throwError(() => ({ error: { message: 'Email already exists' } }))
    );

    component.register();

    expect(component.errorMessage).toBe('Email already exists');
    expect(component.isLoading).toBe(false);
  });
});
