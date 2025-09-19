import { AppEnv } from './app-env.enum';

export interface AppConfiguration {
  readonly environment: AppEnv;
  readonly amountsForeignCy: Record<string, number>;
  readonly usdFnbAmount: number;
  readonly goldAmountInOunces: number;
  readonly silverAmountInKg: number;
  readonly cryptoAmountInBtc: number;
  readonly gunAmountInUsd: number;
}
