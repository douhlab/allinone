import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private static langs = ['en', 'fr', 'de'];
  constructor(private translate: TranslateService) {
    // Add languages
    this.translate.addLangs(AppComponent.langs);
  }
}
