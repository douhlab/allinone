import {Employer} from "./employer";

export interface LeaveRecord {
  id?: number;
  employer: Employer;
  dateHappened: string;
  numberOfDays: number;
  description?: string;
  currentBalance: number;
  note?: string;
}
