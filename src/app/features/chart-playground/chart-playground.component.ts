import { Component } from '@angular/core';
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-chart-playground',
  templateUrl: './chart-playground.component.html',
  styleUrl: './chart-playground.component.scss'
})
export class ChartPlaygroundComponent {

  charts = [
    { title: 'Bar Chart', options: this.getBarOption() },
    { title: 'Line Chart', options: this.getLineOption() },
    { title: 'Pie Chart', options: this.getPieOption() },
    { title: 'Doughnut Chart', options: this.getDoughnutOption() },
    { title: 'Stacked Bar', options: this.getStackedBarOption() },
    { title: 'Area Chart', options: this.getAreaOption() },
    { title: 'Treemap', options: this.getTreemapOption() },
    { title: 'Gauge', options: this.getGaugeOption() }
  ];

  getBarOption(): EChartsOption {
    return {
      xAxis: { type: 'category', data: ['A', 'B', 'C'] },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: [10, 20, 15] }]
    };
  }

  getLineOption(): EChartsOption {
    return {
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
      yAxis: { type: 'value' },
      series: [{ type: 'line', data: [5, 15, 10] }]
    };
  }

  getPieOption(): EChartsOption {
    return {
      series: [{
        type: 'pie',
        data: [
          { value: 40, name: 'A' },
          { value: 60, name: 'B' }
        ]
      }]
    };
  }

  getDoughnutOption(): EChartsOption {
    return {
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 30, name: 'A' },
          { value: 70, name: 'B' }
        ]
      }]
    };
  }

  getStackedBarOption(): EChartsOption {
    return {
      tooltip: {},
      legend: { data: ['A', 'B'] },
      xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar'] },
      yAxis: { type: 'value' },
      series: [
        { name: 'A', type: 'bar', stack: 'total', data: [10, 20, 30] },
        { name: 'B', type: 'bar', stack: 'total', data: [5, 15, 25] }
      ]
    };
  }

  getAreaOption(): EChartsOption {
    return {
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
      yAxis: { type: 'value' },
      series: [{
        type: 'line',
        areaStyle: {},
        data: [8, 18, 12]
      }]
    };
  }

  getTreemapOption(): EChartsOption {
    return {
      series: [{
        type: 'treemap',
        data: [
          { name: 'Group A', value: 100 },
          { name: 'Group B', value: 60 },
          { name: 'Group C', value: 30 }
        ]
      }]
    };
  }

  getGaugeOption(): EChartsOption {
    return {
      series: [{
        type: 'gauge',
        progress: { show: true },
        detail: { valueAnimation: true },
        data: [{ value: 65, name: 'Score' }]
      }]
    };
  }
}
