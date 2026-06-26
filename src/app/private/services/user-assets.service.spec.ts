import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserAssetsService} from './user-assets.service';
import {environment} from '../../../environments/environment';
import {EMPTY_USER_ASSETS} from '../models/user-assets';

describe('UserAssetsService', () => {
  let service: UserAssetsService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/simple-spa/v1/api/user-assets`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserAssetsService]
    });

    service = TestBed.inject(UserAssetsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch user assets for the logged-in user', () => {
    const assets = {
      amountsForeignCy: { EUR: 536 },
      commoditiesAmountsInOunce: { gold: 20.5 },
      usdAmount: 1000,
      usdFnbAmount: 1100,
      cryptoAmountInBtc: 0.5,
      gunAmountInUsd: 1500
    };

    service.getUserAssets().subscribe(result => {
      expect(result).toEqual(assets);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(assets);
  });

  it('should return empty assets when backend returns null', () => {
    service.getUserAssets().subscribe(result => {
      expect(result).toEqual(EMPTY_USER_ASSETS);
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush(null);
  });

  it('should return empty assets when request fails', () => {
    service.getUserAssets().subscribe(result => {
      expect(result).toEqual(EMPTY_USER_ASSETS);
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });
});
