import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FileService} from './file.service';
import {environment} from '../../../environments/environment';

describe('FileService', () => {
  let service: FileService;
  let httpMock: HttpTestingController;

  const localBase = `${environment.apiUrl}/simple-spa/v1/api/local/files`;
  const azureBase = `${environment.apiUrl}/simple-spa/v1/api/azure/files`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileService]
    });

    service = TestBed.inject(FileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should upload file to local storage', () => {
    const file = new File(['data'], 'test.txt');
    const mockResponse = { name: 'test.txt', originalName: 'test.txt' } as any;

    service.uploadFileToLocal(file).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${localBase}/save`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBe(true);
    req.flush(mockResponse);
  });

  it('should download file from local storage', () => {
    service.downloadFileFromLocal('file.txt').subscribe(blob => {
      expect(blob).toBeTruthy();
    });

    const req = httpMock.expectOne(`${localBase}/file.txt`);
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('blob');
    req.flush(new Blob(['content']));
  });

  it('should upload file to azure', () => {
    const file = new File(['data'], 'azure.txt');

    service.uploadFileToAzure(file).subscribe();

    const req = httpMock.expectOne(`${azureBase}/save`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should list and delete azure files', () => {
    service.listFilesFromAzure().subscribe(files => {
      expect(files.length).toBe(1);
    });

    let listReq = httpMock.expectOne(azureBase);
    expect(listReq.request.method).toBe('GET');
    listReq.flush([{ name: 'a.txt' }]);

    service.deleteFileFromAzure('a.txt').subscribe();
    const deleteReq = httpMock.expectOne(`${azureBase}/a.txt`);
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({});
  });

  it('should list and delete local files', () => {
    service.listFilesFromLocal().subscribe();
    const listReq = httpMock.expectOne(localBase);
    expect(listReq.request.method).toBe('GET');
    listReq.flush([]);

    service.deleteFileFromLocal('b.txt').subscribe();
    const deleteReq = httpMock.expectOne(`${localBase}/b.txt`);
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({});
  });
});
