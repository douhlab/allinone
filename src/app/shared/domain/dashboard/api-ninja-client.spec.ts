import { TestBed } from '@angular/core/testing';
import { ApiNinjasClient, API_NINJA_API_KEY } from './api-ninja-client';
import { CommodityPrice } from './api-ninja-models';
import fetchMock from 'jest-fetch-mock';

describe('ApiNinjasClient', () => {
  let service: ApiNinjasClient;
  const fakeApiKey = 'FAKE_KEY';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiNinjasClient, { provide: API_NINJA_API_KEY, useValue: fakeApiKey }]
    });

    service = TestBed.inject(ApiNinjasClient);
    fetchMock.resetMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch commodity price', async () => {
    const mockPrice: CommodityPrice = {
      name: 'Gold',
      price: 1950.5,
      timestamp: Date.now()
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockPrice));

    const result = await service.getCommodityPrice('Gold');

    expect(result).toEqual(mockPrice);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.api-ninjas.com/v1/commodityprice?name=Gold',
      expect.objectContaining({
        headers: { 'X-Api-Key': fakeApiKey }
      })
    );
  });

  it('should throw on HTTP error', async () => {
    fetchMock.mockResponseOnce('Server Error', { status: 500, statusText: 'Internal Server Error' });

    await expect(service.getCommodityPrice('Gold')).rejects.toThrow(
      'Error fetching commodity price: 500 Internal Server Error'
    );
  });

  it('should encode commodity name in URL', async () => {
    const mockPrice: CommodityPrice = { name: 'Crude Oil', price: 85.7, timestamp: Date.now() };
    fetchMock.mockResponseOnce(JSON.stringify(mockPrice));

    const result = await service.getCommodityPrice('Crude Oil');

    expect(result).toEqual(mockPrice);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.api-ninjas.com/v1/commodityprice?name=Crude%20Oil',
      expect.objectContaining({ headers: { 'X-Api-Key': fakeApiKey } })
    );
  });
});
