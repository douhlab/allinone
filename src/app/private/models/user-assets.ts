export interface UserAssets {
  amountsForeignCy: Record<string, number>;
  commoditiesAmountsInOunce: Record<string, number>;
  usdAmount: number;
  usdFnbAmount: number;
  cryptoAmountInBtc: number;
  gunAmountInUsd: number;
}

export const EMPTY_USER_ASSETS: UserAssets = {
  amountsForeignCy: {},
  commoditiesAmountsInOunce: {},
  usdAmount: 0,
  usdFnbAmount: 0,
  cryptoAmountInBtc: 0,
  gunAmountInUsd: 0
};
