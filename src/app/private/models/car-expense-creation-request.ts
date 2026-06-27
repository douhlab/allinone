import {CarExpenseType} from './car-expense-type';
import {CarFuelEventCreationRequest} from './car-fuel-event';

export interface CarExpenseCreationRequest {
  carId: number;
  type: CarExpenseType;
  numberOfDays: number;
  description: string;
  amountInUsd: number;
  serviceStationId: number;
  mainOdometer: number;
  dateHappened: string;
  note?: string;
  fuelEvent?: CarFuelEventCreationRequest;
}
