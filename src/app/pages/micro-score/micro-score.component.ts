
import { Component, ViewChild, OnInit } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexFill,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill: ApexFill;
  legend:ApexLegend
};

@Component({
  selector: 'app-micro-score',
  templateUrl: './micro-score.component.html',
  styleUrls: ['./micro-score.component.css']
})
export class MicroScoreComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "basic",
          data: [40, 43, 60, 53,90, 80],

        }
      ],
      fill:{
        colors:["#DEFF88","#FFD38C","#FF96A3","#A18CE8","#A18CE8","#FF96A3"]
      },
      chart: {
        type: "bar",
        height: "210px",
        width:"320px",
        fontFamily: "dosis-regular",
        foreColor: "#667a92",
        toolbar: {
          show: true,
          tools:{
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '80%',
          distributed:true,
          borderRadius: 4
        }
      },
      legend:{
        show: false,
      showForSingleSeries: false,
      showForNullSeries: false,
      showForZeroSeries: false,
      },
      
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return `${parseInt(val.toString(), 10).toString()}%`;
        },
      style: {
          fontSize: '14px',
          fontFamily: 'dosis-regular',
          fontWeight: 'regular',
          colors: ["rgba(102, 122, 146, 0.802"]
      },
        
      },
      xaxis: {
        categories: [          // RESPONDE AL MICROSCORE SERVICE
          "Potasio",
          "Molibdeno",
          "Vitamina C",
          "Omega 6",
          "Alanina",
          "Serina"
        ],
        labels: {
          show: true,
          style: {
              colors: ["#667a92"],
              fontSize: '14px',
              fontFamily: "dosis-regular"
          }
        }
      }
    };
  }


  ngOnInit(): void {
  }

}
