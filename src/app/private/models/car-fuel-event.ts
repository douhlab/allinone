import {FuelType} from './fuel-type';

export interface CarFuelEvent {
  id?: number;
  carExpenseId?: number;
  refillAmountInLiter: number;
  mileageTraversed: number;
  fuelType: FuelType;
}

export interface CarFuelEventCreationRequest {
  refillAmountInLiter: number;
  mileageTraversed: number;
  fuelType: FuelType;
}
