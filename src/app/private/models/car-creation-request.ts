export interface CarCreationRequest {
  name: string;
  model: string;
  modelYear: number;
  ownedDate: string;
  odometerWhenOwned: number;
  priceInUsdWhenOwned: number;
  note?: string;
}
