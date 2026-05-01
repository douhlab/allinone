import { DashboardComponent } from './dashboard.component';
import { MatTableDataSource } from '@angular/material/table';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  const mockTranslateService = {
    use: jest.fn()
  };

  const mockExchangeRateClient = {
    latest: jest.fn().mockResolvedValue({
      rates: {
        USD: 1,
        EUR: 0.9
      }
    })
  };

  const mockAppConfigService = {
    getConfig: jest.fn().mockReturnValue({
      amountsForeignCy: {
        EUR: 536,
        CHF: 556,
        AUD: 1100,
        CAD: 2600
      },
      commoditiesAmountsInOunce: {
        gold: 20.5,
        silver: 645
      }
    })
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
      mockAppConfigService as any,
      mockMetalsApiClient as any
    );
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
});
