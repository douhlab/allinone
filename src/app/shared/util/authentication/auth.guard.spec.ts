import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  let authService: any;
  let router: any;

  beforeEach(() => {
    authService = {
      isLoggedIn: jest.fn()
    };

    router = {
      navigate: jest.fn(),
      url: '/dashboard'
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow activation when user is logged in', () => {
    authService.isLoggedIn.mockReturnValue(true);

    const result = guard.canActivate();

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login when user is not logged in', () => {
    authService.isLoggedIn.mockReturnValue(false);

    const result = guard.canActivate();

    expect(result).toBe(false);

    expect(router.navigate).toHaveBeenCalledWith(['/login'], {
      state: { attemptedUrl: '/dashboard' }
    });
  });
});
