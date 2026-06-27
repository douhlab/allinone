import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CarExpenseService} from './car-expense.service';
import {environment} from '../../../../environments/environment';
import {CarExpenseType} from '../../models/car-expense-type';
import {FuelType} from '../../models/fuel-type';

describe('CarExpenseService', () => {
  let service: CarExpenseService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/simple-spa/v1/api/car/expenses`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarExpenseService]
    });

    service = TestBed.inject(CarExpenseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all car expenses', () => {
    const mockExpenses = [{id: 1, amountInUsd: 50}] as any;

    service.getAllExpenses().subscribe(expenses => {
      expect(expenses).toEqual(mockExpenses);
    });

    const req = httpMock.expectOne(`${apiUrl}/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockExpenses);
  });

  it('should create a car expense', () => {
    const request = {
      carId: 1,
      type: CarExpenseType.FUEL,
      numberOfDays: 0,
      description: 'Fuel refill',
      amountInUsd: 65.5,
      serviceStationId: 2,
      mainOdometer: 45000,
      dateHappened: '2026-03-01',
      fuelEvent: {
        refillAmountInLiter: 42,
        mileageTraversed: 320,
        fuelType: FuelType.DIESEL
      }
    };
    const response = {id: 10, ...request} as any;

    service.createExpense(request).subscribe(expense => {
      expect(expense).toEqual(response);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush(response);
  });
});
