import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Micronutrients } from 'src/app/models/micronutrient';
import { Recipes } from 'src/app/models/recipes';
import { IngredientesService } from 'src/app/shared/ingredientes.service';
import { LoadingService } from 'src/app/shared/loading.service';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';
import { RecetasService } from 'src/app/shared/recetas.service';




@Component({
  selector: 'app-barra-buscador',
  templateUrl: './barra-buscador.component.html',
  styleUrls: ['./barra-buscador.component.css']
})
export class BarraBuscadorComponent implements OnInit {


// public micronutrientes:any[]  
// public recetas: any[] /// va a contener todos las recetas de la bbdd
public mySwitch: boolean = false
public recetasBuscar: Recipes[] // va a contener la busqueda del input de recetas
public micronutrientesBuscar: Micronutrients[]
public inputSearch:string = ""
 
  
  // public ingredientes: object[] = [{nombre: "Pera"},{nombre: "Manzana"},{nombre: "Granada"}];
  
  constructor(public micronutrientesServicio:MicronutrientesService, 
    public recetasServicio:RecetasService, 
    private loadingService:LoadingService,
    private IngredientesService:IngredientesService,
    public router:Router) {

 
    
  //  this.recetas = this.recetasServicio.recetas
    // this.recetas = JSON.parse(sessionStorage.getItem('recetas'))
    
    // this.micronutrientes = this.micronutrientesServicio.micronutrientes
    // this.micronutrientes = JSON.parse(sessionStorage.getItem('micronutrientes'))

   }

  //  filtrar(input:htmlli) {
  //   // Declare variables
  //   let input, filter, ul, li, a, i, txtValue;
  //   input = document.getElementById('myInput');
  //   filter = input.value.toUpperCase();
  //   ul = document.getElementById("myUL");
  //   li = ul.getElementsByTagName('li');
  
  //   // Loop through all list items, and hide those who don't match the search query
  //   for (i = 0; i < li.length; i++) {
  //     a = li[i].getElementsByTagName("a")[0];
  //     txtValue = a.textContent || a.innerText;
  //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //       li[i].style.display = "";
  //     } else {
  //       li[i].style.display = "none";
  //     }

  //   }
  // }

buscar(){
this.recetasBuscar=[]
this.micronutrientesBuscar = []

  let input = this.inputSearch.toUpperCase();
  for(let i=0; i < this.micronutrientesServicio.micronutrientes .length; i++){
    if(this.micronutrientesServicio.micronutrientes [i].micronutrient_name.toUpperCase().indexOf(input) > -1){
      this.micronutrientesBuscar.push(this.micronutrientesServicio.micronutrientes [i])
    }
  }

  let entrada = this.inputSearch.toUpperCase();
  for(let i=0; i < this.recetasServicio.recetas.length; i++){
    if(this.recetasServicio.recetas[i].recipe_name.toUpperCase().indexOf(entrada) > -1){
      this.recetasBuscar.push(this.recetasServicio.recetas[i])
    }
  }

  this.mySwitch = true

}

rutaMicro(i){
  // console.log(this.micronutrientsGroup[i])
  this.micronutrientesServicio.selectedMicronutriente = this.micronutrientesBuscar[i]
  for(let j=0;j<this.micronutrientesServicio.grupos.length;j++){
    if(this.micronutrientesServicio.grupos[j].group_id==this.micronutrientesServicio.selectedMicronutriente.group_id){
      this.micronutrientesServicio.selectedGroup=this.micronutrientesServicio.grupos[j]
    }
  }

  this.IngredientesService.getIngredientesMicro(this.micronutrientesServicio.selectedMicronutriente.micronutrient_id).subscribe((ingredient:any)=>
    { console.log('ingredient'+ingredient.type)

      if(ingredient.type == 1|| ingredient.type == -2){
        this.IngredientesService.ingredientesRicos = ingredient.message

        this.recetasServicio.getRecetasRicas(this.micronutrientesServicio.selectedMicronutriente.micronutrient_id).subscribe((recipe:any)=>
        { console.log(recipe.type)   
          if(recipe.type == 1|| recipe.type == -2){
            this.recetasServicio.recetasRicas = []
            for(let i = 0; this.recetasServicio.recetas.length>i ; i++){
              for(let j = 0; recipe.message.length>j; j++){
                if (this.recetasServicio.recetas[i].recipe_id == recipe.message[j].recipe_id){
                  this.recetasServicio.recetasRicas.push(this.recetasServicio.recetas[i])
                }console.log(this.recetasServicio.recetasRicas)
              }
            }
            this.loadingService.showNavBar=true;
            this.router.navigate(["/home/grupo/micro"])
          }  
        })
      }
    })

}

   
rutaReceta(i){
 
  this.micronutrientesServicio.getMicrosReceta(this.recetasBuscar[i].recipe_id).subscribe((micronutrientes:any)=>{
   if(micronutrientes.type==1 || micronutrientes.type==-1){
     this.micronutrientesServicio.microsReceta=micronutrientes.message;
   }
   this.recetasServicio.selectedReceta = this.recetasBuscar[i]
   this.loadingService.showNavBar=true;
   this.router.navigate(['buscar-receta/receta']);
  //  console.log(this.recetasBuscar)
  })
 }


  ngOnInit(): void {
  }

}
