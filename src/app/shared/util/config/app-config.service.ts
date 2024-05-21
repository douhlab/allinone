import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { lastValueFrom, tap } from 'rxjs';
import { AppConfiguration } from './app-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private appConfig: AppConfiguration;
  private http: HttpClient;

  constructor(private readonly httpHandler: HttpBackend) {
    this.http = new HttpClient(this.httpHandler);
  }

  loadAppConfig(): Promise<AppConfiguration> {
    return lastValueFrom(
      this.http
        .get<AppConfiguration>('/assets/data/appConfig.json')
        .pipe(tap((data: AppConfiguration) => (this.appConfig = data)))
    );
  }

  getConfig(): AppConfiguration {
    return this.appConfig;
  }
}
