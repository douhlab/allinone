import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  const baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call register API', () => {
    const request = {
      username: 'user1',
      email: 'test@mail.com',
      password: '123'
    } as any;

    service.register(request).subscribe();

    const req = httpMock.expectOne(
      `${baseUrl}/simple-spa/register`
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);

    req.flush({});
  });

  it('should fetch users list', () => {
    const mockUsers = [
      { id: 1, description: 'u1' },
      { id: 2, description: 'u2' }
    ] as any;

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users[0].username).toBe('u1');
    });

    const req = httpMock.expectOne(
      `${baseUrl}/simple-spa/v1/api/users/all`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockUsers);
  });
});
