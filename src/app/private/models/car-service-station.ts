import {ServiceStationType} from './service-station-type';

export interface CarServiceStation {
  id: number;
  name: string;
  location?: string;
  type: ServiceStationType;
  note?: string;
}
