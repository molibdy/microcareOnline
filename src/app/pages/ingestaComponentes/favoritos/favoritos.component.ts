import { Component, OnInit } from '@angular/core';
import { Favourites } from 'src/app/models/favourites';
import { IngestaService } from 'src/app/shared/ingesta.service';

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
  public anadiendo:object = {}
  public indiceAnadiendo:number = 0
  public idBorrando:number = 0


  
  constructor(private apiIngesta:IngestaService) { }

  ngOnInit(): void {
    this.apiIngesta.mostrarFavoritos().subscribe((data:any)=>{
      console.log(data.type);
      console.log(data);
      
      
      if(data.type ==1 || data.type == -2){
        this.apiIngesta.listaFavoritos = data.message;
      this.favoritos = this.apiIngesta.listaFavoritos;
      }
  
      
    
    }) 
  }
  consumirFavorito(i)
  {
    /// aqui ira la llamada al servicio para importar 
    this.isAnadiendo = true
    this.indiceAnadiendo = i
    this.anadiendo = this.favoritos[i]
    
    
  }
  cancelarBorrado(){
    this.indiceBorrando = 0
    this.isBorrando=false

  }
  quitarFavorito(i:number){
    this.isBorrando=true
    this.indiceBorrando = i
/*     this.Borrando = {favourite_id}
 */    this.borrando = this.favoritos[i]
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
