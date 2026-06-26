import {User} from '../../auth/models/user';

export interface Car {
  id: number;
  user: User;
  name: string;
  model: string;
  modelYear: number;
  ownedDate: string;
  odometerWhenOwned: number;
  priceInUsdWhenOwned: number;
  note?: string;
  creationDate?: string;
  createdBy?: string;
}
