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
  exchangeRates: boolean = false;

  appConfig: AppConfiguration;

  tableColumns = ['base', 'date', 'details'];
  rateTableColumns = ['currency', 'rate', 'amount', 'amountInUsd'];

  constructor(
    private welcomeService: WelcomeService,
    private translationService: TranslateService,
    private exchangeRateClient: ExchangeratesapiClient,
    translationLoaderService: TranslationLoaderService,
    private appConfigService: AppConfigService
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
      this.exchangeRateClient = new ExchangeratesapiClient('T8v7yaSk5a8LjfJFfFMqbOymepUT25sa');

      // Get symbols
      // const syms = await this.exchangeRateClient.symbols();
      // console.log('Symbols:', syms.symbols);

      // Latest rates against USD for GBP, EUR
      const latest = await this.exchangeRateClient.latest(
        ['CHF', 'EUR', 'CAD', 'AUD', 'MYR', 'RUB', 'JPY', 'TRY'],
        'USD'
      );
      console.log('Latest rates:', latest.rates);
      console.log('Latest rates:', latest.rates[0]);
      console.log('Latest rates:', latest.rates[1]);

      // // Historical for a specific date
      // const hist = await this.exchangeRateClient.historical('2025-09-15', ['GBP', 'EUR'], 'USD');
      // console.log('Historical rates:', hist.rates);
      //
      // // Convert
      // const conv = await this.exchangeRateClient.convert('USD', 'GBP', 100);
      // console.log(`100 USD is ${conv.result} GBP`);
      //
      // // Time series over a range
      // const ts = await this.exchangeRateClient.timeSeries('2025-09-10', '2025-09-15', ['GBP', 'EUR'], 'USD');
      // console.log('Time series:', ts.rates);
      //
      // // Fluctuation between two dates
      // const fl = await this.exchangeRateClient.fluctuation('2025-09-10', '2025-09-15', ['GBP', 'EUR'], 'USD');
      // console.log('Fluctuation:', fl.rates);

      this.latestRatesDataSource.data = [latest];
      this.exchangeRates = true;
      this.constructDetailsDataSource();

    })();
    console.log(
      'appconfig:' +
        Object.entries(this.appConfig.amountsForeignCy).map(([currency, amount]) => ({
          currency,
          amount
        }))
    );
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

  get recordEntries() {
    console.log(
      'xxx:' +
        Object.entries(this.latestRatesDataSource.data[0].rates).map(([currency, rate]) => ({
          currency,
          rate
        }))
    );
    return Object.entries(this.latestRatesDataSource.data[0].rates).map(([currency, rate]) => ({
      currency,
      rate
    })); // [ ['apples', 5], ['oranges', 10], ... ]
  }

  protected readonly Object = Object;
}

export interface Language {
  flag: string;
  id: string;
  locale: string;
  title: string;
}
