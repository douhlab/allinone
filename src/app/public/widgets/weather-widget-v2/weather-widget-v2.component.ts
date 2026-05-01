import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../service/weather.service";
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-weather-widget-v2',
  templateUrl: './weather-widget-v2.component.html',
  styleUrl: './weather-widget-v2.component.scss'
})
export class WeatherWidgetV2Component implements OnInit {
  loading = true;
  city = 'Beirut';
  currentTemp = 0;
  currentDescription = '';
  chartOptions!: EChartsOption;
  selectedIndex = 0;
  days: any[] = [];

  constructor(private weatherService: WeatherService) {}

  get selectedDay() {
    return this.days[this.selectedIndex];
  }

  ngOnInit(): void {
    this.load();
  }

  selectDay(index: number): void {
    this.selectedIndex = index;
  }

  private load(): void {
    const lat = 33.8938;
    const lon = 35.5018;

    this.weatherService
      .getWeather(lat, lon)
      .subscribe(response => {

        this.currentTemp = response.current.temperature_2m;

        this.currentDescription = this.mapCode(response.current.weather_code);

        this.days = response.daily.time
          .map((day, i) => ({

            label: new Date(day)
              .toLocaleDateString('en-US', {
                weekday: 'short'
              }),

            max: response.daily.temperature_2m_max[i],
            min: response.daily.temperature_2m_min[i],
            rain: response.daily.precipitation_probability_max[i],
            wind: response.daily.wind_speed_10m_max[i],
            description: this.mapCode(response.daily.weather_code[i])
          }));

        this.buildChart();
        this.loading = false;
      });
  }

  private buildChart(): void {
    this.chartOptions = {
      grid: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 20,
        containLabel: true
      },

      xAxis: {
        type: 'category',
        data: this.days
          .map(d => d.label)
      },

      yAxis: {
        type: 'value'
      },

      series: [{
        type: 'line', smooth: true, data: this.days
          .map(d => d.max)
      }]
    };
  }

  private mapCode(code: number): string {

    if (code <= 1) {
      return 'Sunny';
    }

    if (code <= 3) {
      return 'Cloudy';
    }

    if (code < 70) {
      return 'Rainy';
    }

    return 'Unknown';
  }
}
