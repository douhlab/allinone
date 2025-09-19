export type AppConfig = Readonly<{
  environment: 'dev' | 'int' | 'acc' | 'prod';
  usdAmount: number;
  euroAmount: number;
  chfAmount: number;
  audAmount: number;
  cadAmount: number;
  usdFnbAmount: number;
  goldAmountInOunces: number;
  silverAmountInKg: number;
  cryptoAmountInBtc: number;
  gunAmountInUsd: number;
}>;
