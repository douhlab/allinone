import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppConfigService } from './app-config.service';
import { AppConfiguration } from './app-configuration.model';
import { from } from 'rxjs';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppConfigService]
    });
    service = TestBed.inject(AppConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load app config', fakeAsync(() => {
    const expectedConfig = { environment: 'dev' } as AppConfiguration;

    let result;
    from(service.loadAppConfig()).subscribe((config) => {
      result = config;
    });

    const request = httpMock.expectOne('/assets/data/appConfig.json');
    expect(request.request.method).be('GET');
    request.flush(expectedConfig);

    tick();

    expect(result).equal(expectedConfig);
    expect(service.getConfig()).equal(expectedConfig);
  }));
});
