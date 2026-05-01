import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LatestRatesResponse } from '../../shared/domain/dashboard/exchange-rate';
import { ExchangeratesapiClient } from '../../shared/domain/dashboard/exchangeratesapi-client';
import { AppConfigService } from '../../shared/util/config/app-config.service';
import { MetalsClient } from '../../shared/domain/dashboard/metals-client';
import { AppConfiguration } from '../../shared/util/config/app-configuration.model';

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

  exchangeRates: boolean = false;

  appConfig: AppConfiguration;

  tableColumns = ['base', 'date', 'details'];
  rateTableColumns = ['currency', 'rate', 'amount', 'amountInUsd'];

  commoditiesTableColumns = ['name', 'price', 'unit', 'amount', 'amountInUsd'];

  constructor(
    private readonly exchangeRateClient: ExchangeratesapiClient,
    private readonly appConfigService: AppConfigService,
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

    this.appConfig = this.appConfigService.getConfig();

    this.initCommoditiesTable();

    this.showExchangeRates();
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
    for (const [currency, rate] of Object.entries(this.latestRatesDataSource.data[0].rates)) {
      const amount = this.appConfig.amountsForeignCy[currency] ?? 0;
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
      const commodities = Object.keys(this.appConfig.commoditiesAmountsInOunce);

      for (const commodity of commodities) {
        try {
          const priceData = await this.metalsApiClient.getPrice(commodity, 'USD');
          const price = priceData.rate['price'];

          const unit = priceData.unit;
          const amount = this.appConfig.commoditiesAmountsInOunce[commodity] ?? 0;
          const amountInUsd = (amount * price) / (unit === 'toz' ? 1 : 1000); // assuming price is per ounce for precious metals, per barrel for oil

          this.commoditiesDataSource.data.push({
            name: commodity,
            price: price,
            unit: unit,
            amount: amount,
            amountInUsd: amountInUsd
          });
        } catch (error) {
          console.error(`Error fetching price for ${commodity}:`, error);
          const unit = 'NAN';
          const price = 0;
          const amount = 0;
          const amountInUsd = 0;

          this.commoditiesDataSource.data.push({
            name: commodity,
            price: price,
            unit: unit,
            amount: amount,
            amountInUsd: amountInUsd
          });
        } finally {
          this.commoditiesDataSource._updateChangeSubscription();
        }
      }
    })();
  }
}
