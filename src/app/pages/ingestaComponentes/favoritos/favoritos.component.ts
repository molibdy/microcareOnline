import { ProgressService } from './../../../shared/progress.service';
import { Ingredient } from './../../../models/ingredient';
import { Component, OnInit } from '@angular/core';
import { Favourites } from 'src/app/models/favourites';
import { IngestaService } from 'src/app/shared/ingesta.service';
import { Progress } from 'src/app/models/progress';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  public isBorrando:boolean = false 
  public indiceBorrando:number;
  public borrando:Favourites;
  public favoritos:Favourites[]  = []
  public isAnadiendo:boolean = false
  public anadiendo:Favourites;
  public indiceAnadiendo:number = 0
  public idBorrando:number = 0
  public date=new Date()
  public dateString=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`

  
  constructor(private apiIngesta:IngestaService, private progressService:ProgressService) {
    
   }

  ngOnInit(): void {
    this.apiIngesta.mostrarFavoritos().subscribe((data:any)=>{
      console.log(data);
      console.log( JSON.parse(sessionStorage.getItem('userSession')).user_id);

      
      if(data.type ==1 || data.type == -2){
        this.apiIngesta.listaFavoritos = data.message;
      
      }
  
      
    
    }) 
  }
  deshacer(){
    this.progressService.removeProgress(new Progress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString,this.anadiendo.microscore))
         .subscribe((updated:any)=>{
           console.log('progreso añadido, type' + updated.type)
           if(updated.type==1 || updated.type==2){

            this.progressService.getProgress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString)
            .subscribe((progreso:any)=>{
              this.progressService.totalProgress.percents=progreso.message
              sessionStorage.setItem('totalProgress',JSON.stringify(this.progressService.totalProgress))

             /*  this.recetasService.updatePlannedRecipe(planned_recipe_id,false)
              .subscribe((consumida:any)=>{
              console.log('consumida, type ' + consumida.type)
              this.getPlannedRecipes(this.dateToString(this.date))
              }) */
          })
        }
      })
  }
  consumirFavorito(i)
  {
    /// aqui ira la llamada al servicio para importar 
    this.isAnadiendo = true
    this.indiceAnadiendo = i
    this.anadiendo = this.apiIngesta.listaFavoritos[i]

    this.progressService.updateProgress(new Progress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString,this.anadiendo.microscore))
    .subscribe((updated:any)=>{
      console.log('progreso añadido, type' + updated.type)
      if(updated.type==1 || updated.type==2){
        this.progressService.getProgress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString)
        .subscribe((progreso:any)=>{
          this.progressService.totalProgress.percents=progreso.message
          sessionStorage.setItem('totalProgress',JSON.stringify(this.progressService.totalProgress))
          
        })
    

        
      }

    })
    
    
  }
  cancelarBorrado(){
    this.indiceBorrando = 0
    this.isBorrando=false

  }
  quitarFavorito(i:number){
    this.isBorrando=true
    this.indiceBorrando = i
/*     this.Borrando = {favourite_id}
 */    this.borrando = this.apiIngesta.listaFavoritos[i]
  }
  quitarFavoritoDefinitivo(){

    this.apiIngesta.quitarFavoritos(this.borrando).subscribe((data)=>{
      console.log(this.borrando);
       
      console.log(data);
      
      this.apiIngesta.listaFavoritos.splice(this.indiceBorrando,1)
    })
    this.isBorrando=false
  }

}
