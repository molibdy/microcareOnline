
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipes } from 'src/app/models/recipes';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';
import { RecetasService } from 'src/app/shared/recetas.service';







@Component({
  selector: 'app-buscador-recetas',
  templateUrl: './buscador-recetas.component.html',
  styleUrls: ['./buscador-recetas.component.css'],

})



export class BuscadorRecetasComponent implements OnInit {
  

  public recetas: Recipes[]
  public listaParaTi : Recipes[]
  public listaNuevas : Recipes[]

  constructor(
    public recetaService:RecetasService,
    public micronutrientService:MicronutrientesService,
    private router:Router
  ) {
    this.router=router

    this.recetas=JSON.parse(sessionStorage.getItem('recetas'))
    this.listaParaTi=JSON.parse(sessionStorage.getItem('recetasParaTi'))
    this.listaNuevas=this.recetas
    

   }

 
   verRecetaParaTi(i:number){
     this.recetaService.selectedReceta=this.listaParaTi[i]
     this.router.navigate(['../buscar-receta/receta']);
   }


   verRecetaNuevas(i:number){
    this.recetaService.selectedReceta=this.listaNuevas[i]
    this.router.navigate(['../buscar-receta/receta']);
   }

  

    

  ngOnInit(): void {
    // console.log('cargando buscador')
    // this.recetaService.getRecetasParaTi(JSON.parse(sessionStorage.getItem('userSession')).user_id)
    // .subscribe((recetas:any)=>{
    //   console.log(recetas.message)
    //   for(let i=0;i<this.recetas.length;i++){
    //     if(!recetas.message.includes(this.recetas[i].recipe_id)){
    //       this.listaParaTi.push(this.recetas[i])
    //    } 
    //   }

    // })


    

  }

}
