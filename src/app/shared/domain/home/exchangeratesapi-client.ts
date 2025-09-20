// exchangeRatesClient.ts
import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
  ConvertResponse,
  FluctuationResponse,
  HistoricalRatesResponse,
  LatestRatesResponse,
  SymbolsResponse,
  TimeSeriesResponse
} from './exchange-rate';

export const EXCHANGE_RATES_API_KEY = new InjectionToken<string>('ExchangeRatesApiKey');

@Injectable({
  providedIn: 'root'
})
class ExchangeratesapiClient {
  private baseUrl: string = 'https://api.apilayer.com/exchangerates_data';

  constructor(@Inject(EXCHANGE_RATES_API_KEY) private apiKey: string) {}

  getKey() {
    return this.apiKey;
  }

  private async request<T>(path: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(this.baseUrl + path);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        apikey: this.apiKey,
        Accept: 'application/json'
      }
    });
    const text = await res.text();
    if (!res.ok) {
      let msg = `HTTP ${res.status}`;
      // try to include API error if JSON
      try {
        const j = JSON.parse(text);
        msg += `: ${JSON.stringify(j)}`;
      } catch {
        msg += `: ${text}`;
      }
      throw new Error(msg);
    }
    // safe to parse JSON
    return JSON.parse(text) as T;
  }

  async symbols(): Promise<SymbolsResponse> {
    return this.request<SymbolsResponse>('/symbols');
  }

  async latest(symbols?: string[], base?: string): Promise<LatestRatesResponse> {
    const params: Record<string, string> = {};
    if (symbols && symbols.length > 0) {
      params['symbols'] = symbols.join(',');
    }
    if (base) {
      params['base'] = base;
    }
    return this.request<LatestRatesResponse>('/latest', params);
  }

  async historical(date: string, symbols?: string[], base?: string): Promise<HistoricalRatesResponse> {
    // date should be “YYYY-MM-DD”
    const params: Record<string, string> = {};
    if (symbols && symbols.length > 0) {
      params['symbols'] = symbols.join(',');
    }
    if (base) {
      params['base'] = base;
    }
    return this.request<HistoricalRatesResponse>(`/${date}`, params);
  }

  async convert(from: string, to: string, amount: number, date?: string): Promise<ConvertResponse> {
    const params: Record<string, string> = {
      from,
      to,
      amount: amount.toString()
    };
    if (date) {
      params['date'] = date;
    }
    return this.request<ConvertResponse>('/convert', params);
  }

  async timeSeries(
    start_date: string,
    end_date: string,
    symbols?: string[],
    base?: string
  ): Promise<TimeSeriesResponse> {
    const params: Record<string, string> = {
      start_date,
      end_date
    };
    if (symbols && symbols.length > 0) {
      params['symbols'] = symbols.join(',');
    }
    if (base) {
      params['base'] = base;
    }
    return this.request<TimeSeriesResponse>('/timeseries', params);
  }

  async fluctuation(
    start_date: string,
    end_date: string,
    symbols?: string[],
    base?: string
  ): Promise<FluctuationResponse> {
    const params: Record<string, string> = {
      start_date,
      end_date
    };
    if (symbols && symbols.length > 0) {
      params['symbols'] = symbols.join(',');
    }
    if (base) {
      params['base'] = base;
    }
    return this.request<FluctuationResponse>('/fluctuation', params);
  }
}

export { ExchangeratesapiClient };
