import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { WeatherResponse } from '../models/weather.model';
import {WeatherForecastResponse} from "../models/weather-forecast.model";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) {}

  getCurrentWeather(
    latitude: number,
    longitude: number
  ): Observable<WeatherResponse> {

    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&current=temperature_2m,precipitation,wind_speed_10m`;

    return this.http.get<WeatherResponse>(url);
  }

  getForecast(
    latitude: number,
    longitude: number
  ): Observable<WeatherForecastResponse> {

    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
      `&forecast_days=10`;

    return this.http.get<WeatherForecastResponse>(url);
  }

  getWeather(lat: number, lon: number): Observable<WeatherResponse> {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}` +
      `&longitude=${lon}` +
      `&current=temperature_2m,weather_code,wind_speed_10m` +
      `&daily=` +
      `temperature_2m_max,` +
      `temperature_2m_min,` +
      `precipitation_probability_max,` +
      `weather_code,` +
      `wind_speed_10m_max` +
      `&forecast_days=10`;

    return this.http.get<WeatherResponse>(url);
  }
}
