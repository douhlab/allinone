import {TestBed} from '@angular/core/testing';
import {MetalsClient, METALS_API_KEY} from './metals-client';
import {MetalPriceResponse} from './metals-response';
import fetchMock from "jest-fetch-mock";

describe('MetalsClient', () => {
  let service: MetalsClient;
  const fakeApiKey = 'FAKE_KEY';

  beforeEach(() => {
    fetchMock.resetMocks();

    TestBed.configureTestingModule({
      providers: [MetalsClient, {provide: METALS_API_KEY, useValue: fakeApiKey}]
    });

    service = TestBed.inject(MetalsClient);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return metal price from getPrice', async () => {
    const mockResponse = {
      status: 'success',
      timestamp: Date.now(),
      currency: 'USD',
      unit: 'oz',
      metal: 'gold',
      rate: {USD: 2000}
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await service.getPrice('gold', 'USD');

    expect(result).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.metals.dev/v1/metal/spot?api_key=${fakeApiKey}&metal=gold&currency=USD`
    );
  });

  it('should throw an error if API returns non-ok', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    } as Response);

    await expect(service.getPrice('gold')).rejects.toThrow('API error 500: Internal Server Error');
  });

  it('should return multiple silver prices in getSilverInCurrencies', async () => {
    const mockResponses: MetalPriceResponse[] = [
      {
        status: 'success',
        timestamp: Date.now(),
        currency: 'USD',
        unit: 'oz',
        metal: 'silver',
        rate: {USD: 25}
      },
      {
        status: 'success',
        timestamp: Date.now(),
        currency: 'EUR',
        unit: 'oz',
        metal: 'silver',
        rate: {EUR: 23}
      },
      {
        status: 'success',
        timestamp: Date.now(),
        currency: 'GBP',
        unit: 'oz',
        metal: 'silver',
        rate: {GBP: 20}
      }
    ];

    jest.spyOn(service, 'getPrice').mockImplementation(async (metal, currency) => {
      return mockResponses.find((r) => r.currency === currency)!;
    });

    const result = await service.getSilverInCurrencies(['USD', 'EUR', 'GBP']);
    expect(result).toEqual(mockResponses);
    expect(service.getPrice).toHaveBeenCalledTimes(3);
  });
});
