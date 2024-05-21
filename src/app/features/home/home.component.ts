import { Component, OnInit } from '@angular/core';
import { WelcomeService } from '../../shared/domain/welcome/welcome.service';
import { Department } from '../../shared/domain/welcome/department';
import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from '../../shared/util/translation/app-translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';

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
}

export interface Language {
  flag: string;
  id: string;
  locale: string;
  title: string;
}
