import {DashboardComponent} from './dashboard.component';
import {MatTableDataSource} from '@angular/material/table';
import {of} from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  const mockUserAssets = {
    amountsForeignCy: {
      EUR: 536,
      CHF: 556,
      AUD: 1100,
      CAD: 2600
    },
    commoditiesAmountsInOunce: {
      gold: 20.5,
      silver: 645
    },
    usdAmount: 1000,
    usdFnbAmount: 1100,
    cryptoAmountInBtc: 0.5,
    gunAmountInUsd: 1500
  };

  const mockExchangeRateClient = {
    latest: jest.fn().mockResolvedValue({
      rates: {
        USD: 1,
        EUR: 0.9
      }
    })
  };

  const mockUserAssetsService = {
    getUserAssets: jest.fn().mockReturnValue(of(mockUserAssets))
  };

  const mockMetalsApiClient = {
    getPrice: jest.fn().mockResolvedValue({
      rate: { price: 1900 },
      unit: 'toz'
    })
  };

  beforeEach(() => {
    component = new DashboardComponent(
      mockExchangeRateClient as any,
      mockUserAssetsService as any,
      mockMetalsApiClient as any
    );
  });

  it('should load user assets on init', () => {
    component.ngOnInit();

    expect(mockUserAssetsService.getUserAssets).toHaveBeenCalled();
    expect(component.userAssets).toEqual(mockUserAssets);
  });

  it('should compute total in USD correctly', () => {
    component.latestRatesDetailsDataSource = new MatTableDataSource([
      { currency: 'EUR', rate: 0.9, amount: 100, amountInUsd: 111.11 }
    ]);
    const total = component.computeTotalInUsd();
    expect(total).toBeCloseTo(111.11, 2);
  });

  it('should compute total commodities in USD correctly', () => {
    component.commoditiesDataSource = new MatTableDataSource([
      { name: 'gold', price: 1900, unit: 'toz', amount: 2, amountInUsd: 3800 }
    ]);
    const total = component.computeTotalCommoditiesInUsd();
    expect(total).toBe(3800);
  });

  it('should build exchange rate details from user assets', () => {
    component.userAssets = mockUserAssets;
    component.latestRatesDataSource.data = [{
      base: 'USD',
      date: '2026-01-01',
      rates: { EUR: 0.9 }
    } as any];

    component.constructDetailsDataSource();

    expect(component.latestRatesDetailsDataSource.data).toEqual([
      {
        currency: 'EUR',
        rate: 0.9,
        amount: 536,
        amountInUsd: 536 / 0.9
      }
    ]);
  });
});
