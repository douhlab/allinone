import {Component, OnInit} from '@angular/core';
import {EChartsOption, LineSeriesOption, BarSeriesOption} from 'echarts';
import {WeatherService} from '../../service/weather.service';

type WeatherSeries = | LineSeriesOption | BarSeriesOption;

declare const echarts: any;

interface ForecastDay {
  label: string;
  icon: string;
  description: string;
  max: number;
  min: number;
  rain: number;
  wind: number;
}

@Component({
  selector: 'app-weather-widget-v3',
  templateUrl: './weather-widget-v3.component.html',
  styleUrl: './weather-widget-v3.component.scss'
})
export class WeatherWidgetV3Component implements OnInit {

  loading = true;
  city = 'Beirut';
  currentTemp = 0;
  currentDescription = '';
  chartOptions!: EChartsOption;
  selectedIndex = 0;
  days: ForecastDay[] = [];

  constructor(private weatherService: WeatherService) {
  }

  get selectedDay(): ForecastDay {
    return this.days[this.selectedIndex];
  }

  ngOnInit(): void {
    this.loadWeather();
  }

  selectDay(index: number): void {

    this.selectedIndex = index;
    this.buildChart();
  }

  private loadWeather(): void {

    const lat = 33.8938;
    const lon = 35.5018;

    this.weatherService
      .getWeather(lat, lon)
      .subscribe(response => {
        this.currentTemp = response.current.temperature_2m;
        const current = this.mapCode(response.current.weather_code);
        this.currentDescription = current.description;

        this.days = response.daily.time
          .map((day, i) => {
            const mapped = this.mapCode(response.daily.weather_code[i]);

            return {
              label: new Date(day)
                .toLocaleDateString('en-US', {
                  weekday: 'short'
                }),
              icon: mapped.icon,
              description: mapped.description,
              max: response.daily.temperature_2m_max[i],
              min: response.daily.temperature_2m_min[i],
              rain: response.daily.precipitation_probability_max[i],
              wind: response.daily.wind_speed_10m_max[i]
            };
          });
        this.buildChart();
        this.loading = false;
      });
  }

  private buildChart(): void {
    const series: WeatherSeries[] = [
      {
        type: 'line',
        smooth: true,
        symbolSize: 10,
        data: this.days.map(d => d.max),
        areaStyle: {},
        markPoint: {
          data: [
            {
              coord: [
                this.selectedIndex,
                this.days[this.selectedIndex].max
              ],
              name: "selected"
            }
          ]
        }
      },
      {
        type: 'bar',
        data: this.days.map(d => d.rain)
      }
    ];

    this.chartOptions = {
      animation: true,

      grid: {
        left: 0,
        right: 0,
        top: 20,
        bottom: 0,
        containLabel: true
      },

      tooltip: {
        trigger: 'axis'
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.days.map(d => d.label)
        // axisLine: {
        //   show: false
        // },
        // axisTick: {
        //   show: false
        // }
      },

      yAxis: {
        type: 'value',
        show: false
      }

      // series: [
      //   {
      //     type: 'line',
      //     smooth: true,
      //     symbolSize: 10,
      //     data: this.days.map(d => d.max),
      //     areaStyle: {},
      //     markPoint: {
      //       data: [
      //         {
      //           coord: [
      //             this.selectedIndex,
      //             this.days[this.selectedIndex].max]
      //         }
      //       ]
      //     }
      //   },
      //   {
      //     type: 'bar',
      //     data: this.days.map(d => d.rain)
      //   }
      // ]
    };
  }

  private mapCode(code: number) {
    if (code <= 1) {
      return {
        icon: '☀',
        description: 'Sunny'
      };
    }

    if (code <= 3) {
      return {
        icon: '⛅',
        description: 'Partly cloudy'
      };
    }

    return {
      icon: '🌧',
      description: 'Rainy'
    };
  }
}
