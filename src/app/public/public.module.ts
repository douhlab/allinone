// private.module.ts
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicRoutingModule} from './public-routing.module';
import {LandingComponent} from "./landing/landing.component";
import {NewsWidgetComponent} from "./widgets/news-widget/news-widget.component";
import {MarketWidgetComponent} from "./widgets/market-widget/market-widget.component";
import {WeatherWidgetComponent} from "./widgets/weather-widget/weather-widget.component";
import {RecaptchaModule} from "ng-recaptcha";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgxEchartsDirective} from "ngx-echarts";
import {WeatherWidgetV2Component} from "./widgets/weather-widget-v2/weather-widget-v2.component";
import {WeatherWidgetV3Component} from "./widgets/weather-widget-v3/weather-widget-v3.component";

@NgModule({
  declarations: [
    LandingComponent,
    NewsWidgetComponent,
    MarketWidgetComponent,
    WeatherWidgetComponent,
    WeatherWidgetV2Component,
    WeatherWidgetV3Component
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    RecaptchaModule,
    FormsModule,
    RouterModule,
    NgxEchartsDirective
  ]
})
export class PublicModule {
}
