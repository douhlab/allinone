import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LeaveService} from './leave.service';
import {environment} from '../../../../environments/environment';

describe('LeaveService', () => {
  let service: LeaveService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LeaveService]
    });

    service = TestBed.inject(LeaveService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch leaves for a user', () => {
    const mockLeaves = [{ id: 1, numberOfDays: 2 }] as any;

    service.getLeaves(42).subscribe(leaves => {
      expect(leaves).toEqual(mockLeaves);
    });

    const req = httpMock.expectOne(
      r => r.url === `${apiUrl}/simple-spa/v1/api/personalleaverecords/all`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('userId')).toBe('42');
    req.flush(mockLeaves);
  });

  it('should create a leave record', () => {
    const request = { employerId: 1, numberOfDays: 3 } as any;
    const response = { id: 10, numberOfDays: 3 } as any;

    service.createLeave(request).subscribe(record => {
      expect(record).toEqual(response);
    });

    const req = httpMock.expectOne(`${apiUrl}/simple-spa/v1/api/personalleaverecords`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush(response);
  });

  it('should delete a leave record', () => {
    service.deleteLeave(5).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/simple-spa/v1/api/personalleaverecords/ids/5`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should fetch employers', () => {
    const employers = [{ id: 1, name: 'Acme' }] as any;

    service.getEmployers().subscribe(result => {
      expect(result).toEqual(employers);
    });

    const req = httpMock.expectOne(`${apiUrl}/simple-spa/v1/api/employers/all`);
    expect(req.request.method).toBe('GET');
    req.flush(employers);
  });
});
