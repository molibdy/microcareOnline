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
  public borrando:object = {}
  public favoritos:Favourites[]  = []
  public isAnadiendo:boolean = false
  public anadiendo:object = {}
  public indiceAnadiendo:number = 0


  
  constructor(private apiIngesta:IngestaService) { }

  ngOnInit(): void {
    this.apiIngesta.mostrarFavoritos().subscribe((data:any)=>{
      console.log(data);
      this.favoritos = this.apiIngesta.listaFavoritos
      
    
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
    this.borrando = this.favoritos[i]
  }
  quitarFavoritoDefinitivo(){

    this.favoritos.splice(this.indiceBorrando,1)
    this.isBorrando=false
  }

}
