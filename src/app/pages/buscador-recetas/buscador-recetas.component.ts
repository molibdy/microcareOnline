
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



  public mySwitch :boolean = false;
  public recetasBuscar:Recipes[] = null;
  public inputSearch:string = ""

  constructor(
    public recetaService:RecetasService,
    private router:Router,

    
    public recetasService:RecetasService,
    public micronutrienteServicio:MicronutrientesService, 

  ) {
    this.router=router

    this.recetas=JSON.parse(sessionStorage.getItem('recetas'))
    this.listaParaTi=JSON.parse(sessionStorage.getItem('recetasParaTi'))
    this.listaNuevas=this.recetas
    
    this.recetas = JSON.parse(sessionStorage.getItem('recetas'))

   }

 
   verRecetaParaTi(i:number){
     this.recetaService.selectedReceta=this.listaParaTi[i]
     this.router.navigate(['../buscar-receta/receta']);
   }


   verRecetaNuevas(i:number){
    this.recetaService.selectedReceta=this.listaNuevas[i]
    this.router.navigate(['../buscar-receta/receta']);
   }

  

    
/////////////////////nueva parte

buscar(search){

  console.log(this.inputSearch.length);
  
  this.recetasBuscar=[]
  this.inputSearch = search
  console.log(this.recetas)
  let input = this.inputSearch.toUpperCase();
  console.log(input);

  console.log(this.inputSearch.length);
  this.mySwitch = true
  
  for(let i=0; i < this.recetas.length; i++){
    if(this.recetas[i].recipe_name.toUpperCase().indexOf(input) > -1){
      this.recetasBuscar.push(this.recetas[i])
    }
  }  

  console.log(this.recetasBuscar)

}




   rutaReceta(i){
    //  this.recetaService.selectedReceta_id=recipe_id  ESTO DEBERÍA SER OBJETO RECETA?
    this.micronutrienteServicio.getMicrosReceta(this.recetasBuscar[i].recipe_id).subscribe((micronutrientes:any)=>{
     if(micronutrientes.type==1 || micronutrientes.type==-1){
       this.micronutrienteServicio.microsReceta=micronutrientes.message;
     }
     this.recetasService.selectedReceta = this.recetasBuscar[i]
     // this.micronutrientesBuscar[i] = this.micronutrientesServicio.linkMicro()
     this.router.navigate(['buscar-receta/receta']);
     console.log(this.recetasService.selectedReceta.photo_url)
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
