import {TestBed} from '@angular/core/testing';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {JwtInterceptor} from './jwt.interceptor';
import {AuthService} from '../services/auth.service';
import {ToastService} from '../../core/services/toast/toast.service';

describe('JwtInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  const authService = {
    getToken: jest.fn(),
    logout: jest.fn()
  };

  const toastService = {
    show: jest.fn()
  };

  const router = {
    url: '/app/home',
    navigate: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
        },
        {provide: AuthService, useValue: authService},
        {provide: ToastService, useValue: toastService},
        {provide: Router, useValue: router}
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    jest.clearAllMocks();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should attach bearer token for local backend requests', () => {
    authService.getToken.mockReturnValue('jwt-token');

    http.get('http://localhost:8080/simple-spa/v1/api/users').subscribe();

    const req = httpMock.expectOne('http://localhost:8080/simple-spa/v1/api/users');
    expect(req.request.headers.get('Authorization')).toBe('Bearer jwt-token');
    req.flush({});
  });

  it('should not attach bearer token for external requests', () => {
    authService.getToken.mockReturnValue('jwt-token');

    http.get('https://api.example.com/data').subscribe();

    const req = httpMock.expectOne('https://api.example.com/data');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should logout and redirect on 401', () => {
    authService.getToken.mockReturnValue('jwt-token');

    http.get('http://localhost:8080/simple-spa/v1/api/protected').subscribe({
      error: () => {
      }
    });

    const req = httpMock.expectOne('http://localhost:8080/simple-spa/v1/api/protected');
    req.flush('Unauthorized', {status: 401, statusText: 'Unauthorized'});

    expect(authService.logout).toHaveBeenCalled();
    expect(toastService.show).toHaveBeenCalledWith(
      'Session expired. Please login again.',
      'error'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login'], {
      state: {sessionTimeout: true}
    });
  });

  it('should redirect to 403 on forbidden response', () => {
    authService.getToken.mockReturnValue(null);

    http.get('http://localhost:8080/simple-spa/v1/api/admin').subscribe({
      error: () => {
      }
    });

    const req = httpMock.expectOne('http://localhost:8080/simple-spa/v1/api/admin');
    req.flush('Forbidden', {status: 403, statusText: 'Forbidden'});

    expect(toastService.show).toHaveBeenCalledWith('Access denied.', 'error');
    expect(router.navigate).toHaveBeenCalledWith(['/403']);
  });

  it('should redirect to 500 on server error', () => {
    authService.getToken.mockReturnValue(null);

    http.get('http://localhost:8080/simple-spa/v1/api/fail').subscribe({
      error: () => {
      }
    });

    const req = httpMock.expectOne('http://localhost:8080/simple-spa/v1/api/fail');
    req.flush('Server error', {status: 500, statusText: 'Server Error'});

    expect(toastService.show).toHaveBeenCalledWith(
      'Server error. Check your providers.',
      'error'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/500']);
  });
});
