import { Component, OnInit } from '@angular/core';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';
import { RecetasService } from 'src/app/shared/recetas.service';


@Component({
  selector: 'app-barra-buscador',
  templateUrl: './barra-buscador.component.html',
  styleUrls: ['./barra-buscador.component.css']
})
export class BarraBuscadorComponent implements OnInit {

public micronutrientes:any[]
public recetas: any[]
public mySwitch: boolean = false
public recetasBuscar=[]
public micronutrientesBuscar = []

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

buscar(){
this.recetasBuscar=[]
this.micronutrientesBuscar = []

  let input = this.inputSearch.toUpperCase();
  for(let i=0; i < this.micronutrientes.length; i++){
    if(this.micronutrientes[i].micronutrient_name.toUpperCase().indexOf(input) > -1){
      this.micronutrientesBuscar.push(this.micronutrientes[i])
    }
  }

  let entrada = this.inputSearch.toUpperCase();
  for(let i=0; i < this.recetas.length; i++){
    if(this.recetas[i].recipe_name.toUpperCase().indexOf(entrada) > -1){
      this.recetasBuscar.push(this.recetas[i])
    }
  }

  this.mySwitch = true

}

  rutaMicro(){

  }


  ngOnInit(): void {
  }

}
