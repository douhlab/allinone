import { Component, OnInit } from '@angular/core';
import { WelcomeService } from '../../shared/domain/welcome/welcome.service';
import { Department } from '../../shared/domain/welcome/department';
import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from '../../shared/util/translation/app-translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { ExchangeratesapiClient } from './exchangeratesapi-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  title = 'allinone';
  deps: Department[];
  languages: Language[];

  constructor(
    private welcomeService: WelcomeService,
    private translationService: TranslateService,
    private exchangeRateClient: ExchangeratesapiClient,
    translationLoaderService: TranslationLoaderService
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
  }

  ngOnInit(): void {
    this.deps = this.welcomeService.getAllDeps();
    this.setDefaultLanguage();
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
      const syms = await this.exchangeRateClient.symbols();
      console.log('Symbols:', syms.symbols);

      // Latest rates against USD for GBP, EUR
      const latest = await this.exchangeRateClient.latest(['GBP', 'EUR'], 'USD');
      console.log('Latest rates:', latest.rates);

      // Historical for a specific date
      const hist = await this.exchangeRateClient.historical('2025-09-15', ['GBP', 'EUR'], 'USD');
      console.log('Historical rates:', hist.rates);

      // Convert
      const conv = await this.exchangeRateClient.convert('USD', 'GBP', 100);
      console.log(`100 USD is ${conv.result} GBP`);

      // Time series over a range
      const ts = await this.exchangeRateClient.timeSeries('2025-09-10', '2025-09-15', ['GBP', 'EUR'], 'USD');
      console.log('Time series:', ts.rates);

      // Fluctuation between two dates
      const fl = await this.exchangeRateClient.fluctuation('2025-09-10', '2025-09-15', ['GBP', 'EUR'], 'USD');
      console.log('Fluctuation:', fl.rates);

    })();
  }
}

export interface Language {
  flag: string;
  id: string;
  locale: string;
  title: string;
}
