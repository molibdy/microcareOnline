import { Component, OnInit } from '@angular/core';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';
import { RecetasService } from 'src/app/shared/recetas.service';


@Component({
  selector: 'app-barra-buscador',
  templateUrl: './barra-buscador.component.html',
  styleUrls: ['./barra-buscador.component.css']
})
export class BarraBuscadorComponent implements OnInit {

public micronutrientes: []
public recetas: []


  public inputSearch:string = ""
  
  // public ingredientes: object[] = [{nombre: "Pera"},{nombre: "Manzana"},{nombre: "Granada"}];
  
  constructor(public micronutrientesServicio:MicronutrientesService, public recetasServicio:RecetasService) {
    this.micronutrientesServicio.micronutrientes
    this.recetasServicio.recetas
    
    this.recetas = this.recetasServicio.recetas
    
    this.micronutrientes = this.micronutrientesServicio.micronutrientes

   }

  ngOnInit(): void {
  }

}
