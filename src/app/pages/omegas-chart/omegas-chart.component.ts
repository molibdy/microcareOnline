
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
import { Progress } from 'src/app/models/progress';
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
  selector: 'app-omegas-chart',
  templateUrl: './omegas-chart.component.html',
  styleUrls: ['./omegas-chart.component.css']
})

export class OmegasChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public groupData:Group;
  public groups:Group[];
  public groupProgress:Progress;
  public totalProgress:Progress;
  public averagePercent:number;
  constructor(public progressService:ProgressService) { 
    this.groups=JSON.parse(sessionStorage.getItem('groups'));
    this.totalProgress=JSON.parse(sessionStorage.getItem('totalProgress'));
    this.groupProgress=this.totalProgress
    this.groupProgress.percents=[]

    // obtener datos del grupo concreto
    for(let i=0;i<this.groups.length;i++){
      if(this.groups[i].name=='ácidos grasos'){
        this.groupData=this.groups[i];
      }
    }

    //obtener progreso del grupo concreto
    let sumPercent:number=0
    for(let i=0; i<this.totalProgress.percents.length;i++){
      if(this.totalProgress.percents[i].group_id==this.groupData.group_id){
        this.groupProgress.percents.push(this.totalProgress.percents[i])
        sumPercent+=this.totalProgress.percents[i].percent
      }
    }
    this.averagePercent=sumPercent/this.groupProgress.percents.length
 

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
