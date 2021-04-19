import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  
    constructor(private router:Router, public MicronutrientesService: MicronutrientesService, public RecetasService:RecetasService) {

      //this.micronutrientes = JSON.parse(sessionStorage.getItem('micronutrientes'))
    this.micronutrientes = MicronutrientesService.micronutrientes

    this.recetas = RecetasService.recetasRicas

    this.grupos=["nombreGrupo","micronutrientes","color", "propiedades", "score"]
  
    this.ingredientesRicos = ["Platano", "Huevo", "Nueces", "Manzana", "Pimiento"]
    
  }

  verRecetaMicro(i:number){
    this.RecetasService.selectedReceta=this.recetas[i]
    this.router.navigate(['../../../buscar-receta/receta']);
  }

  ngOnInit(): void {

//  console.log(this.recetas)
//  console.log(this.RecetasService.recetas)

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
