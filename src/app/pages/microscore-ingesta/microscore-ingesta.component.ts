import { Component, ViewChild, OnInit } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexFill,
  ApexLegend,
  ApexYAxis
} from "ng-apexcharts";
import { Recipes } from "src/app/models/recipes";
import { IngestaService } from "src/app/shared/ingesta.service";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill: ApexFill;
  legend:ApexLegend;
  yaxis:ApexYAxis
};
@Component({
  selector: 'app-microscore-ingesta',
  templateUrl: './microscore-ingesta.component.html',
  styleUrls: ['./microscore-ingesta.component.css']
})
export class MicroscoreIngestaComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public isMenos=true;
  public isMas=false;

  constructor(public ingestaService:IngestaService) {
    let microData=[];
    let microColors=[];
    let microCategories=[];
    let altura=20;
    for(let i=0;i<this.ingestaService.lastIntake.microscore.length;i++){
      if(this.ingestaService.lastIntake.microscore[i].percent>=1){
        microData.push(this.ingestaService.lastIntake.microscore[i].percent);
        microColors.push(this.ingestaService.lastIntake.microscore[i].color);
        microCategories.push(this.ingestaService.lastIntake.microscore[i].micronutrient_name[0].toUpperCase() + this.ingestaService.lastIntake.microscore[i].micronutrient_name.substring(1));  
        altura+=25;
      }
    }

    this.chartOptions = {
      series: [
        {
          name: "basic",
          data: microData           // DEPENDIENTE DE LAST INTAKE

        }
      ],
      fill:{
        colors: microColors           // DEPENDIENTE DE LAST INTAKE
      },
      chart: {
        type: "bar",
        height: `${altura}px`,              // DEPENDIENTE DE LAST INTAKE
        width:"340px",
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
        categories: microCategories,    // DEPENDIENTE DE LAST INTAKE
        labels: {
          show: true,
          style: {
              colors: ["#667a92"],
              fontSize: '14px',
              fontFamily: "dosis-regular"
          }
        },
        min:0,
        max:100,
        tickAmount:5
      },
      yaxis:{
        labels:{
          style:{
            fontSize:'14px'
          }
        }
      }
    };
  }


  verMenos(){
    this.isMas=false
    this.isMenos=true
  }

  verMas(){
    this.isMas=true
    this.isMenos=false
  }


  ngOnInit(): void {
  }

}
