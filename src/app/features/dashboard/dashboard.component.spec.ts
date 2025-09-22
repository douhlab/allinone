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

  const mockTranslationLoaderService = {
    loadTranslations: jest.fn()
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

  const mockApiNinjasClient = {};
  const mockMetalsApiClient = {
    getPrice: jest.fn().mockResolvedValue({
      rate: { price: 1900 },
      unit: 'toz'
    })
  };

  beforeEach(() => {
    component = new DashboardComponent(
      mockTranslateService as any,
      mockExchangeRateClient as any,
      mockTranslationLoaderService as any,
      mockAppConfigService as any,
      mockApiNinjasClient as any,
      mockMetalsApiClient as any
    );
  });

  it('should set default language on init', () => {
    component.ngOnInit();
    expect(mockTranslateService.use).toHaveBeenCalledWith('en');
  });

  it('should fetch exchange rates and populate data source', async () => {
    await component.showExchangeRates();
    expect(component.latestRatesDataSource.data.length).toBeGreaterThan(0);
    expect(component.exchangeRates).toBe(true);
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

  it('should init commodities table with data', async () => {
    await component.initCommoditiesTable();
    expect(component.commoditiesDataSource.data.length).toBeGreaterThan(0);
    expect(component.commoditiesDataSource.data[0].amountInUsd).toBeGreaterThan(0);
  });
});
