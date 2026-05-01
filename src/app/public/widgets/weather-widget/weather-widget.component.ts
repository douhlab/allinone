import { Component, OnInit } from '@angular/core';
import {EChartsOption} from 'echarts';
import {WeatherService} from '../../service/weather.service';


@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {

  loading = true;
  chartOptions!: EChartsOption;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadWeather();
  }

  private loadWeather(): void {

    const fallbackLat = 33.8938;
    const fallbackLon = 35.5018;

    if (!navigator.geolocation) {
      this.loadForecast(fallbackLat, fallbackLon);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        this.loadForecast(position.coords.latitude, position.coords.longitude);
      }, () => {
        this.loadForecast(fallbackLat, fallbackLon);
      }
    );
  }

  private loadForecast(lat: number, lon: number): void {
    this.weatherService.getForecast(lat, lon).subscribe(response => {
        this.buildChart(response);
        this.loading = false;
      });
  }


  private buildChart(response: any): void {

    const labels = response.daily.time.map((date: string) =>
          new Date(date)
            .toLocaleDateString(
              'en-US',
              {weekday: 'short'}
            )
      );

    this.chartOptions = {
      tooltip: {
        trigger: 'axis'
      },

      legend: {
        data: [
          'Max',
          'Min',
          'Rain'
        ]
      },

      xAxis: {
        type: 'category',
        data: labels
      },

      yAxis: [
        {
          type: 'value'
        }
      ],

      series: [

        {
          name: 'Max',
          type: 'line',
          smooth: true,
          data:
          response.daily.temperature_2m_max
        },

        {
          name: 'Min',
          type: 'line',
          smooth: true,
          data:
          response.daily.temperature_2m_min
        },

        {
          name: 'Rain',
          type: 'bar',
          data:
          response.daily
            .precipitation_probability_max
        }

      ]
    };
  }
}
