import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {LatestRatesResponse} from '../../services/dashboard/exchange-rate';
import {ExchangeratesapiClient} from '../../services/dashboard/exchangeratesapi-client';
import {MetalsClient} from '../../services/dashboard/metals-client';
import {UserAssetsService} from '../../services/user-assets.service';
import {EMPTY_USER_ASSETS, UserAssets} from '../../models/user-assets';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  title = 'allinone';

  latestRatesDataSource: MatTableDataSource<LatestRatesResponse>;
  latestRatesDetailsDataSource: MatTableDataSource<{
    currency: string;
    rate: number;
    amount: number;
    amountInUsd: number;
  }>;
  commoditiesDataSource: MatTableDataSource<{
    name: string;
    price: number;
    unit: string;
    amount: number;
    amountInUsd: number;
  }> = new MatTableDataSource<{
    name: string;
    price: number;
    unit: string;
    amount: number;
    amountInUsd: number;
  }>();

  exchangeRates = false;
  userAssets: UserAssets = EMPTY_USER_ASSETS;

  tableColumns = ['base', 'date', 'details'];
  rateTableColumns = ['currency', 'rate', 'amount', 'amountInUsd'];
  commoditiesTableColumns = ['name', 'price', 'unit', 'amount', 'amountInUsd'];

  constructor(
    private readonly exchangeRateClient: ExchangeratesapiClient,
    private readonly userAssetsService: UserAssetsService,
    private readonly metalsApiClient: MetalsClient
  ) {
    this.latestRatesDataSource = new MatTableDataSource<LatestRatesResponse>();
    this.latestRatesDetailsDataSource = new MatTableDataSource<{
      currency: string;
      rate: number;
      amount: number;
      amountInUsd: number;
    }>();
  }

  ngOnInit(): void {
    this.userAssetsService.getUserAssets().subscribe(assets => {
      this.userAssets = assets;
      this.initCommoditiesTable();
      this.showExchangeRates();
    });
  }

  showExchangeRates(): void {
    (async () => {
      const latest = await this.exchangeRateClient.latest(
        ['CHF', 'EUR', 'CAD', 'AUD', 'MYR', 'RUB', 'JPY', 'TRY'],
        'USD'
      );

      this.latestRatesDataSource.data = [latest];
      this.exchangeRates = true;
      this.constructDetailsDataSource();
    })();
  }

  constructDetailsDataSource() {
    this.latestRatesDetailsDataSource.data = [];

    for (const [currency, rate] of Object.entries(this.latestRatesDataSource.data[0].rates)) {
      const amount = this.userAssets.amountsForeignCy[currency] ?? 0;
      const amountInUsd = amount / rate;

      this.latestRatesDetailsDataSource.data.push({
        currency,
        rate,
        amount,
        amountInUsd
      });
    }
  }

  computeTotalInUsd() {
    return this.latestRatesDetailsDataSource.data.reduce((sum, item) => sum + item.amountInUsd, 0);
  }

  computeTotalCommoditiesInUsd() {
    return this.commoditiesDataSource.data.reduce((sum, item) => sum + item.amountInUsd, 0);
  }

  initCommoditiesTable() {
    (async () => {
      this.commoditiesDataSource.data = [];
      const commodities = Object.keys(this.userAssets.commoditiesAmountsInOunce);

      for (const commodity of commodities) {
        try {
          const priceData = await this.metalsApiClient.getPrice(commodity, 'USD');
          const price = priceData.rate['price'];

          const unit = priceData.unit;
          const amount = this.userAssets.commoditiesAmountsInOunce[commodity] ?? 0;
          const amountInUsd = (amount * price) / (unit === 'toz' ? 1 : 1000);

          this.commoditiesDataSource.data.push({
            name: commodity,
            price: price,
            unit: unit,
            amount: amount,
            amountInUsd: amountInUsd
          });
        } catch (error) {
          console.error(`Error fetching price for ${commodity}:`, error);

          this.commoditiesDataSource.data.push({
            name: commodity,
            price: 0,
            unit: 'NAN',
            amount: 0,
            amountInUsd: 0
          });
        } finally {
          this.commoditiesDataSource._updateChangeSubscription();
        }
      }
    })();
  }
}
