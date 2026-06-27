import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CarExpensesComponent} from './car-expenses.component';
import {CarExpenseService} from '../../services/car/car-expense.service';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CarExpenseType} from '../../models/car-expense-type';

describe('CarExpensesComponent', () => {
  let component: CarExpensesComponent;
  let fixture: ComponentFixture<CarExpensesComponent>;

  let carExpenseServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    carExpenseServiceMock = {
      getAllExpenses: jest.fn().mockReturnValue(of([])),
      createExpense: jest.fn()
    };

    dialogMock = {
      open: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [CarExpensesComponent],
      imports: [MatTableModule, NoopAnimationsModule],
      providers: [
        {provide: CarExpenseService, useValue: carExpenseServiceMock},
        {provide: MatDialog, useValue: dialogMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load expenses on init', () => {
    const mockData = [{id: 1, type: CarExpenseType.FUEL}] as any;
    carExpenseServiceMock.getAllExpenses.mockReturnValue(of(mockData));

    component.loadExpenses();

    expect(carExpenseServiceMock.getAllExpenses).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockData);
  });

  it('should create expense after dialog close with result', () => {
    const dialogResult = {
      carId: 1,
      type: CarExpenseType.MAINTENANCE,
      numberOfDays: 0,
      description: 'Oil change',
      amountInUsd: 120,
      serviceStationId: 3,
      mainOdometer: 50000,
      dateHappened: '2026-03-01'
    };
    const savedExpense = {id: 99, ...dialogResult};

    dialogMock.open.mockReturnValue({
      afterClosed: () => of(dialogResult)
    });
    carExpenseServiceMock.createExpense.mockReturnValue(of(savedExpense));

    component.dataSource.data = [{id: 1} as any];
    component.openDialog();

    expect(carExpenseServiceMock.createExpense).toHaveBeenCalledWith(dialogResult);
    expect(component.dataSource.data).toEqual([{id: 1}, savedExpense]);
  });

  it('should format fuel event details', () => {
    expect(component.formatFuelEvent({fuelEvent: undefined} as any)).toBe('—');
    expect(component.formatFuelEvent({
      fuelEvent: {
        fuelType: 'DIESEL',
        refillAmountInLiter: 40,
        mileageTraversed: 300
      }
    } as any)).toBe('DIESEL · 40L · 300 mi');
  });
});
