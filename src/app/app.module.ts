import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfigService } from './shared/util/config/app-config.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationLoaderService } from './shared/util/translation/app-translation-loader.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './features/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { EXCHANGE_RATES_API_KEY } from './shared/domain/home/exchangeratesapi-client';
import { API_NINJA_API_KEY } from './shared/domain/home/api-ninja-client';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell,
  MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { METALS_API_KEY } from './shared/domain/home/metals-client';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TopbarComponent } from './topbar/topbar.component';
import { LeavesComponent } from './features/reports/leaves/leaves.component';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    SidebarComponent,
    DashboardComponent,
    TopbarComponent,
    LeavesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    MatTable,
    MatColumnDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatFooterRow,
    MatFooterRowDef,
    MatFooterCell,
    MatFooterCellDef
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    TranslationLoaderService,
    { provide: EXCHANGE_RATES_API_KEY, useValue: 'T8v7yaSk5a8LjfJFfFMqbOymepUT25sa' },
    { provide: API_NINJA_API_KEY, useValue: 'CkfamXmH+NZqdulxuxgtMQ==IJNY8D6v4FGqCeqx' },
    { provide: METALS_API_KEY, useValue: 'CY6BGZ9Y3LKACEY4ZKLF221Y4ZKLF' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
