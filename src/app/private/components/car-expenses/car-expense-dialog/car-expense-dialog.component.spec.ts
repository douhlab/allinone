import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CarExpenseDialogComponent} from './car-expense-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {CarService} from '../../../services/car/car.service';
import {of} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {CarExpenseType} from '../../../models/car-expense-type';
import {FuelType} from '../../../models/fuel-type';

describe('CarExpenseDialogComponent', () => {
  let component: CarExpenseDialogComponent;
  let fixture: ComponentFixture<CarExpenseDialogComponent>;

  const carServiceMock = {
    getAllCars: jest.fn().mockReturnValue(of([{id: 1, name: 'Daily', model: 'Civic'}])),
    getAllServiceStations: jest.fn().mockReturnValue(of([{id: 2, name: 'Shell Station'}]))
  };

  const dialogRefMock = {
    close: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarExpenseDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        MatDatepickerModule
      ],
      providers: [
        provideNativeDateAdapter(),
        {provide: CarService, useValue: carServiceMock},
        {provide: MatDialogRef, useValue: dialogRefMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarExpenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT submit when form is invalid', () => {
    component.form.reset();
    component.submit();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should submit fuel expense with fuel event payload', () => {
    const dateHappened = new Date(2026, 2, 1);

    component.form.setValue({
      carId: 1,
      type: CarExpenseType.FUEL,
      numberOfDays: 0,
      description: 'Fuel refill',
      amountInUsd: 65.5,
      serviceStationId: 2,
      mainOdometer: 45000,
      dateHappened,
      note: 'Full tank',
      refillAmountInLiter: 42,
      mileageTraversed: 320,
      fuelType: FuelType.DIESEL
    });

    component.submit();

    expect(dialogRefMock.close).toHaveBeenCalledWith({
      carId: 1,
      type: CarExpenseType.FUEL,
      numberOfDays: 0,
      description: 'Fuel refill',
      amountInUsd: 65.5,
      serviceStationId: 2,
      mainOdometer: 45000,
      dateHappened: '2026-03-01',
      note: 'Full tank',
      fuelEvent: {
        refillAmountInLiter: 42,
        mileageTraversed: 320,
        fuelType: FuelType.DIESEL
      }
    });
  });

  it('should submit non-fuel expense without fuel event', () => {
    const dateHappened = new Date(2026, 2, 1);

    component.form.setValue({
      carId: 1,
      type: CarExpenseType.MAINTENANCE,
      numberOfDays: 0,
      description: 'Oil change',
      amountInUsd: 120,
      serviceStationId: 2,
      mainOdometer: 50000,
      dateHappened,
      note: '',
      refillAmountInLiter: 0,
      mileageTraversed: 0,
      fuelType: FuelType.GASOLINE_95
    });

    component.submit();

    expect(dialogRefMock.close).toHaveBeenCalledWith({
      carId: 1,
      type: CarExpenseType.MAINTENANCE,
      numberOfDays: 0,
      description: 'Oil change',
      amountInUsd: 120,
      serviceStationId: 2,
      mainOdometer: 50000,
      dateHappened: '2026-03-01',
      note: undefined,
      fuelEvent: undefined
    });
  });
});
