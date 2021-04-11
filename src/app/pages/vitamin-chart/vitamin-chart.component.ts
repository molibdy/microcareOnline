
import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke,
  
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-vitamin-chart',
  templateUrl: './vitamin-chart.component.html',
  styleUrls: ['./vitamin-chart.component.css']
})


export class VitaminChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() { 
    this.chartOptions = {
      series: [75],         //DEPENDIENTE DE CLASE
      chart: {
        height: 190,
        type: "radialBar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "65%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 1,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: 0,
              show: false,
              color: " #667a92",
              fontSize: "14px"
              
            },
            value: {
              formatter: function(val) {
                return `${parseInt(val.toString(), 10).toString()}%`;
              },
              offsetY: 8,
              color: " #667a92",
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      fill: {
        colors:["#b7ff00"],   //DEPENDIENTE DE CLASE
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#DEFF88"],    //DEPENDIENTE DE CLASE
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Vitaminas"]     //DEPENDIENTE DE CLASE
    };
  }

  ngOnInit(): void {
  }

}
