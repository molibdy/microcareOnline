
import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke,
  
} from "ng-apexcharts";
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';
import { ProgressService } from 'src/app/shared/progress.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-micronutrient-chart',
  templateUrl: './micronutrient-chart.component.html',
  styleUrls: ['./micronutrient-chart.component.css']
})


export class MicronutrientChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public colors:string[];
  public percent:number;
  constructor(public progressService:ProgressService,
    public micronutrientService:MicronutrientesService) { 
    
    this.percent=0;
    for(let i=0;i<this.progressService.totalProgress.percents.length;i++){
      if(this.progressService.totalProgress.percents[i].micronutrient_id==this.micronutrientService.selectedMicronutriente.micronutrient_id){
        this.percent=this.progressService.totalProgress.percents[i].percent
      }
    }

    this.colors=[this.micronutrientService.selectedGroup.color,this.micronutrientService.selectedGroup.color2]



    this.chartOptions = {
      series: [this.percent],         //DEPENDIENTE DE SERVICE
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
              fontFamily: 'dosis-bold',
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      fill: {
        colors:[this.colors[1]],   //DEPENDIENTE DE SERVICE
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: [this.colors[0]],    //DEPENDIENTE DE SERVICE
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      }
    };
  }

  ngOnInit(): void {
  }

}
