import { Component, OnInit } from '@angular/core';
import { Language } from '../home/home.component';
import { MatTableDataSource } from '@angular/material/table';
import { LatestRatesResponse } from '../../shared/domain/home/exchange-rate';
import { TranslateService } from '@ngx-translate/core';
import { ExchangeratesapiClient } from '../../shared/domain/home/exchangeratesapi-client';
import { TranslationLoaderService } from '../../shared/util/translation/app-translation-loader.service';
import { AppConfigService } from '../../shared/util/config/app-config.service';
import { ApiNinjasClient } from '../../shared/domain/home/api-ninja-client';
import { MetalsClient } from '../../shared/domain/home/metals-client';
import { AppConfiguration } from '../../shared/util/config/app-configuration.model';
import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  title = 'allinone';
  languages: Language[];

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
    private readonly translationService: TranslateService,
    private readonly exchangeRateClient: ExchangeratesapiClient,
    translationLoaderService: TranslationLoaderService,
    private readonly appConfigService: AppConfigService,
    private readonly apiNinjasClient: ApiNinjasClient,
    private readonly metalsApiClient: MetalsClient
  ) {
    this.languages = [
      {
        id: 'en',
        title: 'English',
        flag: 'us',
        locale: 'en-US'
      },
      {
        id: 'fr',
        title: 'Français',
        flag: 'fr',
        locale: 'fr-FR'
      },
      {
        id: 'de',
        title: 'Deutsch',
        flag: 'de',
        locale: 'de-DE'
      }
    ];
    translationLoaderService.loadTranslations(english, french);

    this.latestRatesDataSource = new MatTableDataSource<LatestRatesResponse>();
    this.latestRatesDetailsDataSource = new MatTableDataSource<{
      currency: string;
      rate: number;
      amount: number;
      amountInUsd: number;
    }>();
  }

  ngOnInit(): void {
    this.setDefaultLanguage();

    this.appConfig = this.appConfigService.getConfig();

    this.initCommoditiesTable();

    this.showExchangeRates();
  }

  setDefaultLanguage(): void {
    const languageCode: string = 'en';
    this.setLanguage(this.languages?.find((l: Language) => l.id === languageCode) ?? this.languages[0]);
  }

  private setLanguage(lang: Language): void {
    this.translationService.use(lang.id);
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
    Object.entries(this.latestRatesDataSource.data[0].rates).forEach(([currency, rate]) => {
      const amount = this.appConfig.amountsForeignCy[currency] ?? 0;
      const amountInUsd = amount / rate;
      this.latestRatesDetailsDataSource.data.push({
        currency,
        rate,
        amount,
        amountInUsd
      });
    });
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
