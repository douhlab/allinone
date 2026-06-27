export enum FuelType {
  GASOLINE_95 = 'GASOLINE_95',
  GASOLINE_98 = 'GASOLINE_98',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID'
}

export const FUEL_TYPE_OPTIONS: { value: FuelType; label: string }[] = [
  {value: FuelType.GASOLINE_95, label: 'Gasoline 95'},
  {value: FuelType.GASOLINE_98, label: 'Gasoline 98'},
  {value: FuelType.DIESEL, label: 'Diesel'},
  {value: FuelType.ELECTRIC, label: 'Electric'},
  {value: FuelType.HYBRID, label: 'Hybrid'}
];
