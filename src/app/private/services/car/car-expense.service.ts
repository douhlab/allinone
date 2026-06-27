import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {CarExpense} from '../../models/car-expense';
import {CarExpenseCreationRequest} from '../../models/car-expense-creation-request';

@Injectable({providedIn: 'root'})
export class CarExpenseService {
  private readonly baseUrl = `${environment.apiUrl}/simple-spa/v1/api/car/expenses`;

  constructor(private http: HttpClient) {}

  getAllExpenses(): Observable<CarExpense[]> {
    return this.http.get<CarExpense[]>(`${this.baseUrl}/all`);
  }

  createExpense(request: CarExpenseCreationRequest): Observable<CarExpense> {
    return this.http.post<CarExpense>(this.baseUrl, request);
  }
}
