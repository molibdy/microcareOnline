import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke,
  
} from "ng-apexcharts";
import { Group } from 'src/app/models/group';
import { Microscore } from 'src/app/models/microscore';
import { Progress } from 'src/app/models/progress';
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
  selector: 'app-group-chart',
  templateUrl: './group-chart.component.html',
  styleUrls: ['./group-chart.component.css']
})


export class GroupChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public groupData:Group;
  public groupProgress:Microscore[]
 
  public averagePercent:number;
  constructor(public progressService:ProgressService,
    public micronutrientService:MicronutrientesService) { 

    this.groupProgress=[]

    this.groupData=this.micronutrientService.selectedGroup


    //obtener progreso del grupo concreto
    let sumPercent:number=0
    for(let i=0; i<this.progressService.totalProgress.percents.length;i++){
      if(this.progressService.totalProgress.percents[i].group_id==this.groupData.group_id){
        this.groupProgress.push(this.progressService.totalProgress.percents[i])
        sumPercent+=this.progressService.totalProgress.percents[i].percent
      }
    }
    this.averagePercent=sumPercent/this.groupProgress.length

    this.chartOptions = {
      series: [this.averagePercent],         //DEPENDIENTE DE CLASE
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
              fontFamily: 'dosis-bold',
              show: true
            }
          }
        }
      },
      fill: {
        colors:[this.groupData.color2],   //DEPENDIENTE DE CLASE
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: [this.groupData.color],    //DEPENDIENTE DE CLASE
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: [this.groupData.name]     //DEPENDIENTE DE CLASE
    };
  }


  ngOnInit(): void {
  }

}
