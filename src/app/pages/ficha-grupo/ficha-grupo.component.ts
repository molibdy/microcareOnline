import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { Micronutrients } from 'src/app/models/micronutrient';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';
import { RecetasService } from 'src/app/shared/recetas.service';


@Component({
  selector: 'app-ficha-grupo',
  templateUrl: './ficha-grupo.component.html',
  styleUrls: ['./ficha-grupo.component.css']
})
export class FichaGrupoComponent implements OnInit {

public micronutrientes: Micronutrients[]
public micronutrientsGroup: Micronutrients[] = []
public selectedGroup: Group

  constructor(public micronutrientesServicio:MicronutrientesService, public recetasServicio:RecetasService, public router:Router ) {

  // this.micronutrientes = JSON.parse(sessionStorage.getItem('micronutrientes'))

  this.micronutrientes = this.micronutrientesServicio.micronutrientes
  
  this.selectedGroup = this.micronutrientesServicio.selectedGroup

  console.log(this.micronutrientes)
  console.log(this.selectedGroup)
  

  for(let i = 0; i<this.micronutrientes.length; i++){
    if(this.selectedGroup.group_id == this.micronutrientes[i].group_id){
      this.micronutrientsGroup.push(this.micronutrientes[i])
    } 
  }
  console.log(this.micronutrientsGroup)

}


rutaMicro(i){
  console.log()
  console.log(this.micronutrientsGroup[i])
  this.micronutrientesServicio.selectedMicronutriente = this.micronutrientsGroup[i]
  this.recetasServicio.recetasRicas = this.recetasServicio.recetas ///!! HAY QUE HACER UNA QUERY!!!///
  // this.micronutrientes[i] = this.micronutrientesServicio.linkMicro()
  // this.router.navigate(["home/grupo/micro"], {queryParams: {micronutrient_id : this.micronutrientes[i].micronutrient_id}})
  this.router.navigate(["home/grupo/micro"])
  console.log(this.micronutrientes)

}

  ngOnInit(): void {

    
  
  }

}
