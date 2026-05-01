import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable, of, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class MarketService {

  private alpaApiKey = 'SEH431IUMK28QC0V';
  private finnHunToken = 'd7qhg2pr01qudmimb7d0d7qhg2pr01qudmimb7dg';
  private cache = new Map<string, any>();
  private cacheTime = new Map<string, number>();
  private ttl = 60000; // 1 minute cache

  constructor(private http: HttpClient) {
  }

  getAlphaQuote(symbol: string): Observable<any> {

    return this.http.get(
      `https://www.alphavantage.co/query` +
      `?function=GLOBAL_QUOTE` +
      `&symbol=${symbol}` +
      `&apikey=${this.alpaApiKey}`
    );
  }

  getFinnStock(symbol: string) {
    return forkJoin({
      quote: this.getFinnQuote(symbol),
      profile: this.getFinnProfile(symbol)
    });
  }

  getFinnQuote(symbol: string): Observable<any> {
    const now = Date.now();

    const cached = this.cache.get(symbol);
    const cachedTime = this.cacheTime.get(symbol);

    if (cached && cachedTime && now - cachedTime < this.ttl) {
      return of(cached);
    }

    return this.http.get<any>(
      `https://finnhub.io/api/v1/quote`, {params: {symbol, token: this.finnHunToken}}
    ).pipe(
      tap(res => {
        this.cache.set(symbol, res);
        this.cacheTime.set(symbol, now);
      })
    );
  }

  getFinnProfile(symbol: string) {
    return this.http.get<any>(
      `https://finnhub.io/api/v1/stock/profile2`,
      {params: {symbol, token: this.finnHunToken}}
    );
  }
}
