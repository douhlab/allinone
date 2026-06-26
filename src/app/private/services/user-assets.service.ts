import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {EMPTY_USER_ASSETS, UserAssets} from '../models/user-assets';

@Injectable({
  providedIn: 'root'
})
export class UserAssetsService {
  private readonly apiUrl = `${environment.apiUrl}/simple-spa/v1/api/user-assets`;

  constructor(private http: HttpClient) {}

  getUserAssets(): Observable<UserAssets> {
    return this.http.get<UserAssets | null>(this.apiUrl).pipe(
      map(assets => this.normalize(assets)),
      catchError(() => of(EMPTY_USER_ASSETS))
    );
  }

  private normalize(assets: UserAssets | null): UserAssets {
    if (!assets) {
      return EMPTY_USER_ASSETS;
    }

    return {
      amountsForeignCy: assets.amountsForeignCy ?? {},
      commoditiesAmountsInOunce: assets.commoditiesAmountsInOunce ?? {},
      usdAmount: assets.usdAmount ?? 0,
      usdFnbAmount: assets.usdFnbAmount ?? 0,
      cryptoAmountInBtc: assets.cryptoAmountInBtc ?? 0,
      gunAmountInUsd: assets.gunAmountInUsd ?? 0
    };
  }
}
