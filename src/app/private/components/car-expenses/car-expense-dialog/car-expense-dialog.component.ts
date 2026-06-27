import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {APP_DIALOG_OVERLAY_CLASS} from '../../../../core/services/dialog/dialog.service';
import {CarExpenseCreationRequest} from '../../../models/car-expense-creation-request';
import {CarExpenseType, CAR_EXPENSE_TYPE_OPTIONS} from '../../../models/car-expense-type';
import {FuelType, FUEL_TYPE_OPTIONS} from '../../../models/fuel-type';
import {CarService} from '../../../services/car/car.service';

@Component({
  selector: 'app-car-expense-dialog',
  templateUrl: './car-expense-dialog.component.html',
  styleUrl: './car-expense-dialog.component.scss'
})
export class CarExpenseDialogComponent {

  readonly overlayPanelClass = APP_DIALOG_OVERLAY_CLASS;
  readonly expenseTypes = CAR_EXPENSE_TYPE_OPTIONS;
  readonly fuelTypes = FUEL_TYPE_OPTIONS;
  readonly CarExpenseType = CarExpenseType;

  cars$ = this.carService.getAllCars();
  serviceStations$ = this.carService.getAllServiceStations();

  form = this.fb.group({
    carId: [null as number | null, Validators.required],
    type: [CarExpenseType.FUEL, Validators.required],
    numberOfDays: [0, [Validators.required, Validators.min(0)]],
    description: ['', Validators.required],
    amountInUsd: [0, [Validators.required, Validators.min(0)]],
    serviceStationId: [null as number | null, Validators.required],
    mainOdometer: [0, [Validators.required, Validators.min(0)]],
    dateHappened: [null as Date | null, Validators.required],
    note: [''],
    refillAmountInLiter: [0, Validators.min(0)],
    mileageTraversed: [0, Validators.min(0)],
    fuelType: [FuelType.GASOLINE_95]
  });

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private dialogRef: MatDialogRef<CarExpenseDialogComponent>
  ) {}

  get showFuelFields(): boolean {
    return this.form.value.type === CarExpenseType.FUEL;
  }

  submit(): void {
    if (this.form.invalid || !this.isFuelSectionValid()) {
      return;
    }

    const value = this.form.getRawValue();

    const request: CarExpenseCreationRequest = {
      carId: value.carId!,
      type: value.type!,
      numberOfDays: value.numberOfDays!,
      description: value.description!,
      amountInUsd: value.amountInUsd!,
      serviceStationId: value.serviceStationId!,
      mainOdometer: value.mainOdometer!,
      dateHappened: this.formatDate(value.dateHappened),
      note: value.note || undefined
    };

    if (value.type === CarExpenseType.FUEL) {
      request.fuelEvent = {
        refillAmountInLiter: value.refillAmountInLiter!,
        mileageTraversed: value.mileageTraversed!,
        fuelType: value.fuelType!
      };
    }

    this.dialogRef.close(request);
  }

  close(): void {
    this.dialogRef.close();
  }

  private isFuelSectionValid(): boolean {
    if (!this.showFuelFields) {
      return true;
    }

    const value = this.form.getRawValue();
    return value.refillAmountInLiter! > 0
      && value.mileageTraversed! >= 0
      && !!value.fuelType;
  }

  private formatDate(date: Date | null): string {
    if (!date) {
      return '';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
