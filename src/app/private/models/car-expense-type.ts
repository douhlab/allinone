export enum CarExpenseType {
  FUEL = 'FUEL',
  MAINTENANCE = 'MAINTENANCE',
  REPAIR = 'REPAIR',
  INSURANCE = 'INSURANCE',
  TAX = 'TAX',
  OTHER = 'OTHER'
}

export const CAR_EXPENSE_TYPE_OPTIONS: { value: CarExpenseType; label: string }[] = [
  {value: CarExpenseType.FUEL, label: 'Fuel'},
  {value: CarExpenseType.MAINTENANCE, label: 'Maintenance'},
  {value: CarExpenseType.REPAIR, label: 'Repair'},
  {value: CarExpenseType.INSURANCE, label: 'Insurance'},
  {value: CarExpenseType.TAX, label: 'Tax'},
  {value: CarExpenseType.OTHER, label: 'Other'}
];
