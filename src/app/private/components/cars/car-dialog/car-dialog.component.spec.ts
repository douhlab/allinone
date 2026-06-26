import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CarDialogComponent} from './car-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

describe('CarDialogComponent', () => {
  let component: CarDialogComponent;
  let fixture: ComponentFixture<CarDialogComponent>;

  const dialogRefMock = {
    close: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatDatepickerModule
      ],
      providers: [
        provideNativeDateAdapter(),
        {provide: MatDialogRef, useValue: dialogRefMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call close on dialog when close() is called', () => {
    component.close();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should NOT submit when form is invalid', () => {
    component.form.reset();
    component.submit();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should submit valid form and close dialog with payload', () => {
    const ownedDate = new Date(2020, 5, 15);

    component.form.setValue({
      name: 'Daily driver',
      model: 'Honda Civic',
      modelYear: 2020,
      ownedDate,
      odometerWhenOwned: 12000,
      priceInUsdWhenOwned: 18500,
      note: 'First car'
    });

    component.submit();

    expect(dialogRefMock.close).toHaveBeenCalledWith({
      name: 'Daily driver',
      model: 'Honda Civic',
      modelYear: 2020,
      ownedDate: '2020-06-15',
      odometerWhenOwned: 12000,
      priceInUsdWhenOwned: 18500,
      note: 'First car'
    });
  });
});
