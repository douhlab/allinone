import { Component, OnInit } from '@angular/core';
import { WelcomeService } from '../../shared/domain/welcome/welcome.service';
import { Department } from '../../shared/domain/welcome/department';
import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from '../../shared/util/translation/app-translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { ExchangeratesapiClient } from '../../shared/domain/home/exchangeratesapi-client';
import { MatTableDataSource } from '@angular/material/table';
import { LatestRatesResponse } from '../../shared/domain/home/exchange-rate';
import { AppConfigService } from '../../shared/util/config/app-config.service';
import { AppConfiguration } from '../../shared/util/config/app-configuration.model';
import { ApiNinjasClient } from '../../shared/domain/home/api-ninja-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  title = 'allinone';
  deps: Department[];
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
    private welcomeService: WelcomeService,
    private translationService: TranslateService,
    private exchangeRateClient: ExchangeratesapiClient,
    translationLoaderService: TranslationLoaderService,
    private appConfigService: AppConfigService,
    private apiNinjasClient: ApiNinjasClient
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
    this.deps = this.welcomeService.getAllDeps();
    this.setDefaultLanguage();

    this.appConfig = this.appConfigService.getConfig();

    this.initCommoditiesTable();
  }

  setDefaultLanguage(): void {
    const languageCode: string = 'en';
    this.setLanguage(this.languages?.filter((l: Language) => l.id === languageCode)[0] ?? 'en');
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
    Object.entries(this.latestRatesDataSource.data[0].rates).map(([currency, rate]) => {
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
          const priceData = await this.apiNinjasClient.getCommodityPrice(commodity);
          const price = priceData.price;
          const unit = 'ounce';
          const amount = this.appConfig.commoditiesAmountsInOunce[commodity] ?? 0;
          const amountInUsd = (amount * price) / (unit === 'ounce' ? 1 : 1000); // assuming price is per ounce for precious metals, per barrel for oil

          this.commoditiesDataSource.data.push({
            name: commodity,
            price: price,
            unit: unit,
            amount: amount,
            amountInUsd: amountInUsd
          });
        } catch (error) {
          console.error(`Error fetching price for ${commodity}:`, error);
          const unit = 'ounce';
          const price = 43;
          const amount = this.appConfig.commoditiesAmountsInOunce[commodity] ?? 0;
          const amountInUsd = (amount * price) / (unit === 'ounce' ? 1 : 1000); // assuming price is per ounce for precious metals, per barrel for oil
          this.commoditiesDataSource.data.push({
            name: commodity,
            price: price,
            unit: unit,
            amount: amount,
            amountInUsd: amountInUsd
          }); // continue to next commodity
          continue;
        } finally {
          // After processing all commodities, you might want to refresh the table view
          this.commoditiesDataSource._updateChangeSubscription();
        }
      }
    })();
  }
}

export interface Language {
  flag: string;
  id: string;
  locale: string;
  title: string;
}
