import { CommodityPrice } from './api-ninja-models';
import { Inject, Injectable, InjectionToken } from '@angular/core';

export const API_NINJA_API_KEY = new InjectionToken<string>('ApiNinjaApiKey');

@Injectable({
  providedIn: 'root'
})
export class ApiNinjasClient {
  private readonly baseUrl = 'https://api.api-ninjas.com/v1';

  constructor(@Inject(API_NINJA_API_KEY) private apiKey: string) {}

  /**
   * Get the current price of a commodity
   * @param commodityName e.g. "Gold", "Silver", "Crude Oil"
   */
  async getCommodityPrice(commodityName: string): Promise<CommodityPrice> {
    const url = `${this.baseUrl}/commodityprice?name=${encodeURIComponent(commodityName)}`;

    const response = await fetch(url, {
      headers: { 'X-Api-Key': this.apiKey }
    });

    if (!response.ok) {
      throw new Error(`Error fetching commodity price: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as CommodityPrice;
  }
}
