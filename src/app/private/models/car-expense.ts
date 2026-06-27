import {Car} from './car';
import {CarExpenseType} from './car-expense-type';
import {CarServiceStation} from './car-service-station';
import {CarFuelEvent} from './car-fuel-event';

export interface CarExpense {
  id: number;
  car: Car;
  type: CarExpenseType;
  description?: string;
  amountInUsd: number;
  serviceStation?: CarServiceStation;
  mainOdometer: number;
  dateHappened: string;
  note?: string;
  creationDate?: string;
  createdBy?: string;
  fuelEvent?: CarFuelEvent;
}
