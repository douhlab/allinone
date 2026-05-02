import { MetalPriceResponse } from './metals-response';
import { Inject, Injectable, InjectionToken } from '@angular/core';

export const METALS_API_KEY = new InjectionToken<string>('MetalsApiKey');

@Injectable({
  providedIn: 'root'
})
export class MetalsClient {
  private baseUrl = 'https://api.metals.dev/v1';

  constructor(@Inject(METALS_API_KEY) private apiKey: string) {}

  /**
   * Get latest spot price for a metal (default USD)
   */
  async getPrice(metal: string = 'gold', currency: string = 'USD'): Promise<MetalPriceResponse> {
    const url = `${this.baseUrl}/metal/spot?api_key=${this.apiKey}&metal=${metal}&currency=${currency}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }

    return (await res.json()) as MetalPriceResponse;
  }

  /**
   * Example: Get silver in multiple currencies
   */
  async getSilverInCurrencies(currencies: string[] = ['USD', 'EUR', 'GBP']): Promise<MetalPriceResponse[]> {
    const promises = currencies.map((cur) => this.getPrice('silver', cur));
    return Promise.all(promises);
  }
}
