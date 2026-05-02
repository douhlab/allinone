export interface LeaveRecordCreationRequest {
  userId?: number;
  employerId: string;
  dateHappened: string;
  numberOfDays: number;
  description?: string;
  currentBalance: number;
  note?: string;
}
