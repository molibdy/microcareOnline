import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { Micronutrients } from 'src/app/models/micronutrient';
import { IngredientesService } from 'src/app/shared/ingredientes.service';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';
import { RecetasService } from 'src/app/shared/recetas.service';


@Component({
  selector: 'app-ficha-grupo',
  templateUrl: './ficha-grupo.component.html',
  styleUrls: ['./ficha-grupo.component.css']
})
export class FichaGrupoComponent implements OnInit {


public micronutrientes: Micronutrients[]
public micronutrientsGroup: Micronutrients[] = []
public selectedGroup: Group

  constructor(public micronutrientesServicio:MicronutrientesService, public recetasServicio:RecetasService, public IngredientesService:IngredientesService, public router:Router ) {

  // this.micronutrientes = JSON.parse(sessionStorage.getItem('micronutrientes'))

  this.micronutrientes = this.micronutrientesServicio.micronutrientes
  
  this.selectedGroup = this.micronutrientesServicio.selectedGroup
  
  
  for(let i = 0; i<this.micronutrientes.length; i++){
    if(this.selectedGroup.group_id == this.micronutrientes[i].group_id){
      this.micronutrientsGroup.push(this.micronutrientes[i])
    } 
  }
 
}


rutaMicro(i){

  console.log(this.micronutrientsGroup[i])
  this.micronutrientesServicio.selectedMicronutriente = this.micronutrientsGroup[i]
  this.recetasServicio.recetasRicas = this.recetasServicio.recetas ///!! HAY QUE HACER UNA QUERY!!!///

  this.IngredientesService.getIngredientesMicro(this.micronutrientesServicio.selectedMicronutriente.micronutrient_id).subscribe((ingredient:any)=>
    { console.log(ingredient.type)
      if(ingredient.type == 1|| ingredient.type == -2){
        this.IngredientesService.ingredientesRicos = ingredient.message

        this.recetasServicio.getRecetasRicas(this.micronutrientesServicio.selectedMicronutriente.micronutrient_id).subscribe((recipe:any)=>
        { console.log(recipe.type)    
          if(recipe.type == 1|| recipe.type == -2){
            
            for(let i = 0; this.recetasServicio.recetas.length>i ; i++){
              for(let j = 0; recipe.message.length>j; j++){
                if (this.recetasServicio.recetas[i].recipe_id == recipe.message[j].recipe_id){
                  this.recetasServicio.recetasRicas = []
                  this.recetasServicio.recetasRicas.push(this.recetasServicio.recetas[i])
                }console.log(this.recetasServicio.recetasRicas)
              }
            }this.router.navigate(["home/grupo/micro"])
          }  
        })
      }
    })



  // this.micronutrientes[i] = this.micronutrientesServicio.linkMicro()
  // this.router.navigate(["home/grupo/micro"], {queryParams: {micronutrient_id : this.micronutrientes[i].micronutrient_id}})

}

  ngOnInit(): void {

  
  }

}
