import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient';
import { Micronutrients } from 'src/app/models/micronutrient';
import { Recipes } from 'src/app/models/recipes';
import { IngredientesService } from 'src/app/shared/ingredientes.service';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';
import { RecetasService } from 'src/app/shared/recetas.service';



@Component({
  selector: 'app-ficha-micro',
  templateUrl: './ficha-micro.component.html',
  styleUrls: ['./ficha-micro.component.css']
})
export class FichaMicroComponent implements OnInit {
 
  public ingredientes: Ingredient[]
  public recetas:Recipes[] = []
  public recetasRespuesta
 
 
  public selectedMicronutriente: Micronutrients
  
    constructor(private router:Router, public MicronutrientesService: MicronutrientesService, public RecetasService:RecetasService, public IngredientesService:IngredientesService) {

      //this.micronutrientes = JSON.parse(sessionStorage.getItem('micronutrientes'))
    this.ingredientes = this.IngredientesService.ingredientesRicos
    console.log(this.ingredientes);
    

    this.recetas = this.RecetasService.recetasRicas
  
    // this.ingredientesRicos()
    // this.recetasRicas()
    
  }

  verRecetaMicro(i:number){
    this.RecetasService.selectedReceta=this.recetas[i]
    this.router.navigate(['/buscar-receta/receta']);
  }

  // ingredientesRicos(){
  //   this.IngredientesService.getIngredientesMicro(this.MicronutrientesService.selectedMicronutriente.micronutrient_id).subscribe((ingredient:any)=>
  //   {
  //     if(ingredient.type == 1|| ingredient.type == -2){
  //       this.IngredientesService.ingredientesRicos = ingredient.message
  //       this.ingredientes = this.IngredientesService.ingredientesRicos 
  //     }
  //   })
  // }

  // recetasRicas(){
  //   this.RecetasService.getRecetasRicas(this.MicronutrientesService.selectedMicronutriente.micronutrient_id).subscribe((recipe:any)=>
  //   { console.log(recipe.message)
      
  //     if(recipe.type == 1|| recipe.type == -2){
        
  //       for(let i = 0; this.recetas.length>i ; i++){

  //         for(let j = 0; recipe.message.length>j; j++){
  //           if (this.RecetasService.recetas[i].recipe_id == recipe.message[j].recipe_id){
  //             this.recetas = []
  //             this.RecetasService.recetasRicas = []
  //             this.recetas.push(this.RecetasService.recetas[i])
  //             this.RecetasService.recetasRicas.push(this.RecetasService.recetas[i])
  //           }
  //         }
  //       }console.log(this.recetas)
  //     } 
  //   })
  // }


    
  


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
