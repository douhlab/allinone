import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {WeatherService} from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch current weather', () => {
    service.getCurrentWeather(46.2, 6.1).subscribe();

    const req = httpMock.expectOne(
      r => r.url.startsWith('https://api.open-meteo.com/v1/forecast')
    );
    expect(req.request.url).toContain('latitude=46.2');
    expect(req.request.url).toContain('longitude=6.1');
    expect(req.request.url).toContain('current=temperature_2m');
    req.flush({});
  });

  it('should fetch forecast', () => {
    service.getForecast(40.7, -74.0).subscribe();

    const req = httpMock.expectOne(
      r => r.url.startsWith('https://api.open-meteo.com/v1/forecast')
    );
    expect(req.request.url).toContain('forecast_days=10');
    expect(req.request.url).toContain('daily=temperature_2m_max');
    req.flush({});
  });

  it('should fetch combined weather data', () => {
    service.getWeather(48.8, 2.3).subscribe();

    const req = httpMock.expectOne(
      r => r.url.startsWith('https://api.open-meteo.com/v1/forecast')
    );
    expect(req.request.url).toContain('weather_code');
    expect(req.request.url).toContain('wind_speed_10m_max');
    req.flush({});
  });
});
