import {ComponentFixture, TestBed} from '@angular/core/testing';

import {of} from "rxjs";
import {WeatherService} from "../../service/weather.service";
import {WeatherWidgetV3Component} from "./weather-widget-v3.component";

describe('WeatherWidgetV3Component', () => {
  let component: WeatherWidgetV3Component;
  let fixture: ComponentFixture<WeatherWidgetV3Component>;

  let weatherServiceMock: any;

  beforeEach(async () => {
    weatherServiceMock = {
      getTopHeadlines: jest.fn().mockReturnValue(of([]))
    };
    await TestBed.configureTestingModule({
      declarations: [WeatherWidgetV3Component],
      providers: [
        {provide: WeatherService, useValue: weatherServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherWidgetV3Component);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
