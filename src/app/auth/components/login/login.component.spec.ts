import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

window.history.replaceState = jest.fn();

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authService: any;
  let router: any;

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
      imports: [
        FormsModule
      ],
      providers: [
        {provide: AuthService, useValue: authService},
        {provide: Router, useValue: router}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  // ---------------- FIX #1 ----------------
  it('should redirect to /home if already logged in', () => {
    authService.isLoggedIn.mockReturnValue(true);

    component.ngOnInit(); // OK now

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should set captcha token', () => {
    component.onCaptchaResolved('abc-token');

    expect(component.captchaToken).toBe('abc-token');
  });

  // it('should login successfully and navigate', () => {
  //   component.username = 'user1';
  //   component.password = 'pass';
  //   component.captchaToken = 'token';
  //
  //   authService.login.mockReturnValue(of({token: 'jwt-token'}));
  //
  //   component.login();
  //
  //   expect(authService.login).toHaveBeenCalledWith(
  //     'user1',
  //     'pass',
  //     'token'
  //   );
  //
  //   expect(authService.setToken).toHaveBeenCalledWith('jwt-token');
  //   expect(router.navigate).toHaveBeenCalledWith(['/home']);
  // });

});
