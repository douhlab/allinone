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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/core/authentication/jwt.interceptor';
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
  MatTable,
  MatTableModule
} from '@angular/material/table';
import { METALS_API_KEY } from './shared/domain/home/metals-client';
import { SidebarComponent } from './core/interface/sidebar/sidebar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TopbarComponent } from './core/interface/topbar/topbar.component';
import { LeavesComponent } from './features/leaves/leaves.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterOutlet } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { PeopleStatsComponent } from './features/people-stats/people-stats.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { SettingsComponent } from './shared/settings/settings.component';
import { UploadLocalComponent } from './features/upload-local/upload-local.component';
import { UploadAzureComponent } from './features/upload-azure/upload-azure.component';
import { BarcodeComponent } from "./features/barcode/barcode.component";
import {QRCodeModule} from "angularx-qrcode";
import {NgOptimizedImage} from "@angular/common";
import {CalculatorComponent} from "./shared/calculator/calculator.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormField, MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {CdkDrag, CdkDragHandle} from "@angular/cdk/drag-drop";
import {DialogShellComponent} from "./shared/dialog-shell/dialog-shell.component";
import {QrcodeReaderComponent} from "./features/qrcode-reader/qrcode-reader.component";
import {NgxEchartsModule} from "ngx-echarts";
import {ChartPlaygroundComponent} from "./features/chart-playground/chart-playground.component";

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    WelcomeComponent,
    SidebarComponent,
    DashboardComponent,
    TopbarComponent,
    LeavesComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    PeopleStatsComponent,
    ProfileComponent,
    SettingsComponent,
    UploadLocalComponent,
    UploadAzureComponent,
    BarcodeComponent,
    QrcodeReaderComponent,
    CalculatorComponent,
    DialogShellComponent,
    ChartPlaygroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    MatTable,
    MatTableModule,
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
    MatFooterCellDef,
    QRCodeModule,
    FormsModule,
    NgOptimizedImage,
    MatFormField,
    MatButton,
    MatInput,
    MatIconButton,
    CdkDragHandle,
    CdkDrag,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: EXCHANGE_RATES_API_KEY, useValue: 'T8v7yaSk5a8LjfJFfFMqbOymepUT25sa' },
    { provide: API_NINJA_API_KEY, useValue: 'CkfamXmH+NZqdulxuxgtMQ==IJNY8D6v4FGqCeqx' },
    { provide: METALS_API_KEY, useValue: 'CY6BGZ9Y3LKACEY4ZKLF221Y4ZKLF' },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
