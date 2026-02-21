import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  // Mock objects
  let mockAuthService: { isAuthenticated: jest.Mock };
  let mockRouter: { navigate: jest.Mock };

  beforeEach(() => {
    mockAuthService = {
      isAuthenticated: jest.fn()
    };

    mockRouter = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow activation when authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(true);

    const result = guard.canActivate();

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should block activation and redirect when NOT authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(false);

    const result = guard.canActivate();

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
