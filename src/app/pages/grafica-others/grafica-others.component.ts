
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
import { LoginInfoService } from "src/app/shared/login-info.service";
import { ProgressService } from "src/app/shared/progress.service";

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

  public userDates:number[];
  public userPercents:[number,number][];
  public othersPercents:[number,number][];

  constructor(private progressService:ProgressService, private userService:LoginInfoService) {

    this.userDates=[]
    this.userPercents=[]

    for(let i=0;i<this.progressService.averageProgress.length;i++){
      console.log(typeof this.progressService.averageProgress[i].date)
      this.userDates.push(this.progressService.averageProgress[i].date.slice(0,10))
      console.log(this.userDates)
      let fecha=Date.parse(this.progressService.averageProgress[i].date)
      this.userPercents.push([fecha,this.progressService.averageProgress[i].percent])
      
    }

    this.othersPercents=[]
    for(let i=0;i<this.progressService.averageProgressTotal.length;i++){
      let fecha=Date.parse(this.progressService.averageProgressTotal[i].date)
      this.othersPercents.push([fecha,this.progressService.averageProgressTotal[i].percent])
    }
    

    // for(let i=0;i<this.progressService.averageProgress.length;i++){
    //   // let fecha=this.progressService.averageProgress[i].date.slice(0,10)
    //   console.log(typeof this.progressService.averageProgress[i].date)
    //   this.userDates.push(this.progressService.averageProgress[i].date)
    //   this.userPercents.push(this.progressService.averageProgress[i].percent)
    // }

    // this.othersPercents=[]
    // for(let i=0;i<this.progressService.averageProgressTotal.length;i++){
    //   // let fecha=this.progressService.averageProgressTotal[i].date.slice(0,10)
    //   if(this.userDates.includes(this.progressService.averageProgressTotal[i].date)){
    //     this.othersPercents.push(this.progressService.averageProgressTotal[i].percent)
    //   }
    // }

    this.chartOptions = {
      series: [
        {
          name: this.userService.user.username,   // username
          data: this.userPercents,   // Array de average progress del user
          color:"#5ce1e6"
        },
        {
          name: "otros usuarios",     // 
          data: this.othersPercents,     // Array de average progress Total
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
        // categories: this.userDates,
        labels: {
          format: 'd MMM',
        }
        // ["2021-09-18", "2021-09-19","2021-09-20","2021-09-21","2021-09-22","2021-09-23","2021-09-24"]
      },
      tooltip: {
        enabled: false
      }
    };
  }


  ngOnInit(): void {
  }

}
