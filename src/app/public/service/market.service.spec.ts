import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MarketService} from './market.service';

describe('MarketService', () => {
  let service: MarketService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarketService]
    });

    service = TestBed.inject(MarketService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch alpha quote', () => {
    service.getAlphaQuote('AAPL').subscribe();

    const req = httpMock.expectOne(
      r => r.url.includes('alphavantage.co/query')
    );
    expect(req.request.url).toContain('symbol=AAPL');
    expect(req.request.url).toContain('function=GLOBAL_QUOTE');
    req.flush({});
  });

  it('should fetch finn quote and cache the result', () => {
    const quote = { c: 100 };

    service.getFinnQuote('MSFT').subscribe(res => {
      expect(res).toEqual(quote);
    });

    const req = httpMock.expectOne(
      r => r.url === 'https://finnhub.io/api/v1/quote'
    );
    expect(req.request.params.get('symbol')).toBe('MSFT');
    req.flush(quote);

    service.getFinnQuote('MSFT').subscribe(res => {
      expect(res).toEqual(quote);
    });

    httpMock.expectNone(
      r => r.url.includes('finnhub.io/api/v1/quote')
    );
  });

  it('should fetch finn profile', () => {
    service.getFinnProfile('TSLA').subscribe();

    const req = httpMock.expectOne(
      r => r.url === 'https://finnhub.io/api/v1/stock/profile2'
    );
    expect(req.request.params.get('symbol')).toBe('TSLA');
    req.flush({ name: 'Tesla' });
  });

  it('should combine finn quote and profile', () => {
    service.getFinnStock('NVDA').subscribe(result => {
      expect(result.quote).toEqual({ c: 1 });
      expect(result.profile).toEqual({ name: 'Nvidia' });
    });

    const quoteReq = httpMock.expectOne(
      r => r.url === 'https://finnhub.io/api/v1/quote'
    );
    quoteReq.flush({ c: 1 });

    const profileReq = httpMock.expectOne(
      r => r.url === 'https://finnhub.io/api/v1/stock/profile2'
    );
    profileReq.flush({ name: 'Nvidia' });
  });
});
