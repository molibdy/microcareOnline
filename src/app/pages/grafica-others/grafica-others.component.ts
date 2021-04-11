
import { Component, ViewChild, OnInit  } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-grafica-others',
  templateUrl: './grafica-others.component.html',
  styleUrls: ['./grafica-others.component.css']
})
export class GraficaOthersComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "userName",   // DEPENDE DE USER
          data: [31, 40, 28, 51, 42, 99, 100],   // DEPENDE DE USER
          color:"#5ce1e6"
        },
        {
          name: "otros usuarios",     // RELLENAR
          data: [11, 32, 45, 32, 34, 52, 41],     // RELLENAR
          color:"#B2C1C6"
        }
      ],
      chart: {
        height: 300,
        type: "area",
        toolbar: {
          show: true,
          tools:{
            download: false,
            selection: false,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: false
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        colors: ["#5ce1e6","#B2C1C6"]
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2021-09-18",     // RELLENAR
          "2021-09-19",
          "2021-09-20",
          "2021-09-21",
          "2021-09-22",
          "2021-09-23",
          "2021-09-24"
        ]
      },
      tooltip: {
        x: {
          format: "dd MMM"
        }
      }
    };
  }


  ngOnInit(): void {
  }

}
