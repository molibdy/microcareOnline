
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
import { Recipes } from "src/app/models/recipes";
import { RecetasService } from "src/app/shared/recetas.service";

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
  public selectedReceta:Recipes;

  constructor(public recetasService:RecetasService) {
    this.selectedReceta=this.recetasService.selectedReceta;
    let microData=[];
    let microColors=[];
    let microCategories=[];
    for(let i=0;i<7;i++){
      microData.push(this.selectedReceta.microscore[i].percent);
      microColors.push(this.selectedReceta.microscore[i].color);
      microCategories.push(this.selectedReceta.microscore[i].micronutrient_name[0].toUpperCase() + this.selectedReceta.microscore[i].micronutrient_name.substring(1));
    }

    this.chartOptions = {
      series: [
        {
          name: "basic",
          data: microData

        }
      ],
      fill:{
        colors: microColors
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
        categories: microCategories,
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
      }
    };
  }


  ngOnInit(): void {
  }

}
