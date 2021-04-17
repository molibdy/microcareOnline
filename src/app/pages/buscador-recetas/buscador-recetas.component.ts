
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { BuscadorRecetasPipe } from 'src/app/pipes/buscador-recetas.pipe';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';
import { RecetasService } from 'src/app/shared/recetas.service';






@Component({
  selector: 'app-buscador-recetas',
  templateUrl: './buscador-recetas.component.html',
  styleUrls: ['./buscador-recetas.component.css'],
  // pipes: BuscadorRecetasPipe
})



export class BuscadorRecetasComponent implements OnInit {
  

  public recetas: Recipe[]
  public listaParaTi : Recipe[]
  public listaNuevas : Recipe[]

  constructor(
    public recetaService:RecetasService,
    public micronutrientService:MicronutrientesService,
    private router:Router
  ) {
    this.router=router

    this.recetas=JSON.parse(sessionStorage.getItem('recetas'))
    this.listaParaTi=[]
    this.listaNuevas=this.recetas
    this.buildForYou()

   }

 
   verRecetaParaTi(i:number){
     this.recetaService.selectedReceta=this.listaParaTi[i]
     this.router.navigate(['receta']);
   }


   verRecetaNuevas(i:number){
    this.recetaService.selectedReceta=this.listaNuevas[i]
    this.router.navigate(['receta']);
   }

   
   buildForYou(){
    this.recetaService.getRecetasParaTi(JSON.parse(sessionStorage.getItem('userSession')).user_id)
    .subscribe((recetas:any)=>{
      console.log(recetas.message)
      for(let i=0;i<this.recetas.length;i++){
        if(!recetas.message.includes(this.recetas[i].recipe_id)){
          this.listaParaTi.push(this.recetas[i])
       } 
      }
      console.log('listaParaTi')
      console.log(this.listaParaTi)
    })
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
