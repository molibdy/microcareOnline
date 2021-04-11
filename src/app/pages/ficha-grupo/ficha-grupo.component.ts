import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-grupo',
  templateUrl: './ficha-grupo.component.html',
  styleUrls: ['./ficha-grupo.component.css']
})
export class FichaGrupoComponent implements OnInit {

public grupos:string[]
public micronutrientes: string[]

  constructor() {

  this.grupos=["nombreGrupo","micronutrientes","color", "propiedades", "score"]
  this.micronutrientes=["Potasio", "Magnesio", "Hierro", "Azufre", "Cloro", "Seleno", "Fran","Cobre"]

}

  ngOnInit(): void {
  }

}
