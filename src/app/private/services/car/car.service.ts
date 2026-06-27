import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Car} from '../../models/car';
import {CarCreationRequest} from '../../models/car-creation-request';
import {CarServiceStation} from '../../models/car-service-station';

@Injectable({providedIn: 'root'})
export class CarService {
  private readonly baseUrl = `${environment.apiUrl}/simple-spa/v1/api/car`;

  constructor(private http: HttpClient) {
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/all`);
  }

  createCar(request: CarCreationRequest): Observable<Car> {
    return this.http.post<Car>(this.baseUrl, request);
  }

  getAllServiceStations(): Observable<CarServiceStation[]> {
    return this.http.get<CarServiceStation[]>(`${this.baseUrl}/service-stations/all`);
  }
}
