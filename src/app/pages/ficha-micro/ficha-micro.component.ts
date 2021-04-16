import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-micro',
  templateUrl: './ficha-micro.component.html',
  styleUrls: ['./ficha-micro.component.css']
})
export class FichaMicroComponent implements OnInit {
  public grupos:string[]
  public micronutrientes: string[]
  public ingredientesRicos:string[]
  
    constructor() {

    this.grupos=["nombreGrupo","micronutrientes","color", "propiedades", "score"]
  
    this.ingredientesRicos = ["Platano", "Huevo", "Nueces", "Manzana", "Pimiento"]
    

  }

  ngOnInit(): void {
  }

}
