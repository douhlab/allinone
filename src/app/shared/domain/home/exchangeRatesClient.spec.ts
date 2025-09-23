import { TestBed } from '@angular/core/testing';
import { ExchangeratesapiClient, EXCHANGE_RATES_API_KEY } from './exchangeratesapi-client';
import {
  SymbolsResponse,
  LatestRatesResponse,
  ConvertResponse,
  HistoricalRatesResponse,
  TimeSeriesResponse,
  FluctuationResponse
} from './exchange-rate';
import fetchMock from 'jest-fetch-mock';

describe('ExchangeratesapiClient', () => {
  let service: ExchangeratesapiClient;
  const fakeApiKey = 'FAKE_KEY';

  beforeEach(() => {
    fetchMock.resetMocks();

    TestBed.configureTestingModule({
      providers: [ExchangeratesapiClient, { provide: EXCHANGE_RATES_API_KEY, useValue: fakeApiKey }]
    });

    service = TestBed.inject(ExchangeratesapiClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.getKey()).toBe(fakeApiKey);
  });

  it('should fetch symbols', async () => {
    const mockSymbols: SymbolsResponse = {
      success: true,
      symbols: { USD: 'US Dollar', EUR: 'Euro' }
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockSymbols));

    const result = await service.symbols();
    expect(result).toEqual(mockSymbols);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.apilayer.com/exchangerates_data/symbols',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({ apikey: fakeApiKey })
      })
    );
  });

  it('should fetch latest rates', async () => {
    const mockLatest: LatestRatesResponse = {
      success: true,
      base: 'USD',
      date: '2025-09-23',
      rates: { EUR: 0.92, GBP: 0.81 },
      timestamp: Date.now()
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockLatest));

    const result = await service.latest(['EUR', 'GBP'], 'USD');
    expect(result).toEqual(mockLatest);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('should throw on HTTP error', async () => {
    fetchMock.mockResponseOnce('Server Error', { status: 500, statusText: 'Internal Server Error' });

    await expect(service.latest()).rejects.toThrow('HTTP 500: Server Error');
  });

  it('should call convert endpoint', async () => {
    const mockConvert: ConvertResponse = {
      success: true,
      query: { from: 'USD', to: 'EUR', amount: 100 },
      info: { rate: 0.92, timestamp: Date.now() },
      result: 92,
      date: '2025-09-23'
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockConvert));

    const result = await service.convert('USD', 'EUR', 100);
    expect(result).toEqual(mockConvert);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('should fetch historical rates', async () => {
    const mockHistorical: HistoricalRatesResponse = {
      success: true,
      rates: { EUR: 0.91 },
      historical: true
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockHistorical));

    const result = await service.historical('2025-09-22', ['EUR'], 'USD');
    expect(result).toEqual(mockHistorical);
  });

  it('should fetch time series', async () => {
    const mockTS: TimeSeriesResponse = {
      success: true,
      start_date: '2025-09-20',
      end_date: '2025-09-23',
      rates: {
        '2025-09-20': { EUR: 0.91 },
        '2025-09-23': { EUR: 0.92 }
      }
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockTS));

    const result = await service.timeSeries('2025-09-20', '2025-09-23', ['EUR']);
    expect(result).toEqual(mockTS);
  });

  it('should fetch fluctuation', async () => {
    const mockFluctuation: FluctuationResponse = {
      success: true,
      start_date: '2025-09-20',
      end_date: '2025-09-23',
      rates: {
        EUR: { start_rate: 0.91, end_rate: 0.92, change: 0.01, change_pct: 1.1 }
      }
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockFluctuation));

    const result = await service.fluctuation('2025-09-20', '2025-09-23', ['EUR']);
    expect(result).toEqual(mockFluctuation);
  });
});
