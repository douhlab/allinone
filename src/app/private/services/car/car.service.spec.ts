import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CarService} from './car.service';
import {environment} from '../../../../environments/environment';

describe('CarService', () => {
  let service: CarService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/simple-spa/v1/api/car`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarService]
    });

    service = TestBed.inject(CarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all cars', () => {
    const mockCars = [{id: 1, name: 'My Car'}] as any;

    service.getAllCars().subscribe(cars => {
      expect(cars).toEqual(mockCars);
    });

    const req = httpMock.expectOne(`${apiUrl}/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCars);
  });

  it('should create a car', () => {
    const request = {
      name: 'Civic',
      model: 'Honda Civic',
      modelYear: 2020,
      ownedDate: '2020-06-15',
      odometerWhenOwned: 12000,
      priceInUsdWhenOwned: 18500
    };
    const response = {id: 10, ...request} as any;

    service.createCar(request).subscribe(car => {
      expect(car).toEqual(response);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush(response);
  });
});
