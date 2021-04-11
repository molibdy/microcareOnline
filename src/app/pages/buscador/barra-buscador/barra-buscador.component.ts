import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-buscador',
  templateUrl: './barra-buscador.component.html',
  styleUrls: ['./barra-buscador.component.css']
})
export class BarraBuscadorComponent implements OnInit {
  public inputSearch:string = ""
  public micronutrientes: object[] = [{nombre:'Molibdeno'},{nombre:'Potasio'}]
  public ingredientes: object[] = [{nombre: "Pera"},{nombre: "Manzana"},{nombre: "Granada"}];
  public recetas:object[] = [{nombre:'Lentejas con sardinas y queso'},{nombre:'Anchoas con la leche de Pascu condensada'}]

  constructor() { }

  ngOnInit(): void {
  }

}
