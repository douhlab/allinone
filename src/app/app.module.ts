import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AppConfigService} from "./shared/util/config/app-config.service";
import {JwtInterceptor} from "./core/authentication/jwt.interceptor";
import {EXCHANGE_RATES_API_KEY} from "./shared/domain/dashboard/exchangeratesapi-client";
import {API_NINJA_API_KEY} from "./shared/domain/dashboard/api-ninja-client";
import {METALS_API_KEY} from "./shared/domain/dashboard/metals-client";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NgxEchartsModule} from "ngx-echarts";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [
    // AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},

    {provide: EXCHANGE_RATES_API_KEY, useValue: 'T8v7yaSk5a8LjfJFfFMqbOymepUT25sa'},
    {provide: API_NINJA_API_KEY, useValue: 'CkfamXmH+NZqdulxuxgtMQ==IJNY8D6v4FGqCeqx'},
    {provide: METALS_API_KEY, useValue: 'CY6BGZ9Y3LKACEY4ZKLF221Y4ZKLF'}
    // provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
