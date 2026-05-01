import {ComponentFixture, TestBed} from '@angular/core/testing';

import {of} from "rxjs";
import {WeatherWidgetComponent} from "./weather-widget.component";
import {WeatherService} from "../../service/weather.service";

describe('WeatherWidgetComponent', () => {
  let component: WeatherWidgetComponent;
  let fixture: ComponentFixture<WeatherWidgetComponent>;

  let weatherServiceMock: any;

  beforeEach(async () => {
    weatherServiceMock = {
      getTopHeadlines: jest.fn().mockReturnValue(of([]))
    };
    await TestBed.configureTestingModule({
      declarations: [WeatherWidgetComponent],
      providers: [
        {provide: WeatherService, useValue: weatherServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherWidgetComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
