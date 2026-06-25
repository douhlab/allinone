import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {environment} from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: { navigate: jest.Mock };

  beforeEach(() => {
    localStorage.clear();
    router = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: router }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token and user', () => {
    const response = {
      token: 'jwt-token',
      user: { id: 1, username: 'user1' }
    };

    service.login('user1', 'pass', 'captcha').subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/simple-spa/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: 'user1',
      password: 'pass',
      captchaToken: 'captcha'
    });
    req.flush(response);

    expect(service.getToken()).toBe('jwt-token');
    expect(service.getUser()).toEqual(response.user);
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should set and get token', () => {
    service.setToken('abc');
    expect(service.getToken()).toBe('abc');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should set user and emit on user$', (done) => {
    const user = { id: 2, username: 'tester' } as any;

    service.user$.subscribe(value => {
      if (value) {
        expect(value).toEqual(user);
        done();
      }
    });

    service.setUser(user);
    expect(localStorage.getItem('user')).toBe(JSON.stringify(user));
  });

  it('should logout and redirect to login', () => {
    service.setToken('jwt');
    service.setUser({ id: 1, username: 'user1' } as any);

    service.logout();

    expect(service.getToken()).toBeNull();
    expect(service.getUser()).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login'], {
      state: { loggedOut: true }
    });
  });
});
