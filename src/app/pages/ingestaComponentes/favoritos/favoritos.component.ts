import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  public isBorrando:boolean = false 
  public indiceBorrando:number;
  public borrando:object = {}
  public favoritos:object[]  = [{nombre: "Desayuno", score: [{nombre:'a'},{nombre:'molibdeno'}], class: 'gradientGO', numConsum: 3},
                                {nombre: "Merienda", score: "A,B,B",class: 'gradientPO', numConsum: 3},
                                {nombre: "Cena", score: "A,B,B",class: 'gradientOG', numConsum: 0},
                                {nombre: "Pan tumaca", score: "A,B,B",class: 'gradientPG', numConsum: 0}]
  public isAnadiendo:boolean = false
  public anadiendo:object = {}
  public indiceAnadiendo:number = 0
  

  
  constructor() { }

  ngOnInit(): void {
   
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
