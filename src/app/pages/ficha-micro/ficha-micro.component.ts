import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Micronutrients } from 'src/app/models/micronutrient';
import { Recipes } from 'src/app/models/recipes';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';
import { RecetasService } from 'src/app/shared/recetas.service';



@Component({
  selector: 'app-ficha-micro',
  templateUrl: './ficha-micro.component.html',
  styleUrls: ['./ficha-micro.component.css']
})
export class FichaMicroComponent implements OnInit {
  public grupos:string[]
  public micronutrientes: Micronutrients[]
  public ingredientesRicos:string[]
  public recetas:Recipes[]


  public selectedMicronutriente: Micronutrients
  
    constructor(private route:ActivatedRoute, public MicronutrientesService: MicronutrientesService, public RecetasService:RecetasService) {

    this.micronutrientes = JSON.parse(sessionStorage.getItem('micronutrientes'))

    this.recetas = JSON.parse(sessionStorage.getItem('recetas'))
    

    this.grupos=["nombreGrupo","micronutrientes","color", "propiedades", "score"]
  
    this.ingredientesRicos = ["Platano", "Huevo", "Nueces", "Manzana", "Pimiento"]
    
  }

  ngOnInit(): void {


    // this.route.queryParamMap.subscribe(params=>
    // { console.log(params)
    //   for(let i=0; i < this.micronutrientes.length; i++){
    //     if(this.micronutrientes[i].micronutrient_id = Number(params.get(params.keys[0]))){
    //       this.MicronutrientesService.selectedMicronutriente = this.micronutrientes[i]
    //     }
    //   }
    //   console.log(params.get(params.keys[0]))
    // })
    
  }

}
