import {ComponentFixture, TestBed} from '@angular/core/testing';

import {of} from "rxjs";
import {WeatherService} from "../../service/weather.service";
import {WeatherWidgetV2Component} from "./weather-widget-v2.component";

describe('WeatherWidgetV2Component', () => {
  let component: WeatherWidgetV2Component;
  let fixture: ComponentFixture<WeatherWidgetV2Component>;

  let weatherServiceMock: any;

  beforeEach(async () => {
    weatherServiceMock = {
      getTopHeadlines: jest.fn().mockReturnValue(of([]))
    };
    await TestBed.configureTestingModule({
      declarations: [WeatherWidgetV2Component],
      providers: [
        {provide: WeatherService, useValue: weatherServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherWidgetV2Component);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
