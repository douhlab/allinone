import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MetalPriceResponse } from '../shared/domain/home/metals-response';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async getHello(): Promise<User[]> {
    const url = `${this.apiUrl}/first?id=1`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }

    return (await res.json()) as User[];
  }
}
