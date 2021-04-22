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
  // borrando favorito 
  public isBorrando:boolean = false 
  public indiceBorrando:number;
  public borrando:Favourites;
  public idBorrando:number = 0
  //// objetos favoritos 
  public anadiendo:Favourites;
  public favoritos:Favourites[]  = []
  /// switch de anadir 
  public isAnadiendo:boolean = false
  public indiceAnadiendo:number = 0
/// fechas
  public date=new Date()
  public dateString=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`
/// switch already anadida 
  public alreadyAnadida:boolean = false
  public showAlreadyConsumed:boolean =false

/// constructor 
  constructor(public apiIngesta:IngestaService, private progressService:ProgressService) {
    
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

               this.apiIngesta.updateConsumedFavourite(this.anadiendo.consumed_favourites_id,false)
              .subscribe((consumida:any)=>{
              console.log('consumida, type ' + consumida.type)
              
              })  
          })
        }
      })
  }
  consumirFavorito(i)
  {
    /// aqui ira la llamada al servicio para importar
    if(this.isAnadiendo){
      this.alreadyAnadida = true
      this.showAlreadyConsumed=true
    }
    else{
      this.isAnadiendo = true
      this.indiceAnadiendo = i
      this.anadiendo = this.apiIngesta.listaFavoritos[i]
      this.apiIngesta.postConsumedFavorito(JSON.parse(sessionStorage.getItem('userSession')).user_id, true,this.anadiendo,this.dateString)
      .subscribe((Consumido:any)=>{
        this.anadiendo.consumed_favourites_id = Consumido.message
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
      }) 
    }
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
