import { Component, OnInit } from '@angular/core';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';
import { RecetasService } from 'src/app/shared/recetas.service';


@Component({
  selector: 'app-barra-buscador',
  templateUrl: './barra-buscador.component.html',
  styleUrls: ['./barra-buscador.component.css']
})
export class BarraBuscadorComponent implements OnInit {

public micronutrientes: any[]
public recetas: any[]


  public inputSearch:string = ""
  
  // public ingredientes: object[] = [{nombre: "Pera"},{nombre: "Manzana"},{nombre: "Granada"}];
  
  constructor(public micronutrientesServicio:MicronutrientesService, public recetasServicio:RecetasService) {
    this.micronutrientesServicio.micronutrientes
    this.recetasServicio.recetas
    
   // this.recetas = this.recetasServicio.recetas
    this.recetas = JSON.parse(sessionStorage.getItem('recetas'))
    
    // this.micronutrientes = this.micronutrientesServicio.micronutrientes
    this.micronutrientes = JSON.parse(sessionStorage.getItem('micronutrientes'))

   }

  //  filtrar(input:htmlli) {
  //   // Declare variables
  //   let input, filter, ul, li, a, i, txtValue;
  //   input = document.getElementById('myInput');
  //   filter = input.value.toUpperCase();
  //   ul = document.getElementById("myUL");
  //   li = ul.getElementsByTagName('li');
  
  //   // Loop through all list items, and hide those who don't match the search query
  //   for (i = 0; i < li.length; i++) {
  //     a = li[i].getElementsByTagName("a")[0];
  //     txtValue = a.textContent || a.innerText;
  //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //       li[i].style.display = "";
  //     } else {
  //       li[i].style.display = "none";
  //     }

  //   }
  // }


  ngOnInit(): void {
  }

}
