import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CarsComponent} from './cars.component';
import {CarService} from '../../services/car/car.service';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('CarsComponent', () => {
  let component: CarsComponent;
  let fixture: ComponentFixture<CarsComponent>;

  let carServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    carServiceMock = {
      getAllCars: jest.fn().mockReturnValue(of([])),
      createCar: jest.fn()
    };

    dialogMock = {
      open: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [CarsComponent],
      imports: [MatTableModule, NoopAnimationsModule],
      providers: [
        {provide: CarService, useValue: carServiceMock},
        {provide: MatDialog, useValue: dialogMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cars on init', () => {
    const mockData = [{id: 1, name: 'Civic'}] as any;
    carServiceMock.getAllCars.mockReturnValue(of(mockData));

    component.loadCars();

    expect(carServiceMock.getAllCars).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockData);
  });

  it('should create car after dialog close with result', () => {
    const dialogResult = {
      name: 'Civic',
      model: 'Honda Civic',
      modelYear: 2020,
      ownedDate: '2020-06-15',
      odometerWhenOwned: 12000,
      priceInUsdWhenOwned: 18500
    };
    const savedCar = {id: 99, ...dialogResult};

    dialogMock.open.mockReturnValue({
      afterClosed: () => of(dialogResult)
    });
    carServiceMock.createCar.mockReturnValue(of(savedCar));

    component.dataSource.data = [{id: 1} as any];
    component.openDialog();

    expect(carServiceMock.createCar).toHaveBeenCalledWith(dialogResult);
    expect(component.dataSource.data).toEqual([{id: 1}, savedCar]);
  });

  it('should NOT create car if dialog returns undefined', () => {
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(undefined)
    });

    component.openDialog();

    expect(carServiceMock.createCar).not.toHaveBeenCalled();
  });
});
