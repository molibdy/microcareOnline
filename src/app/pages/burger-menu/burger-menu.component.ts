import { Component, OnInit } from '@angular/core';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';

import { RecetasService } from 'src/app/shared/recetas.service';



@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.css']
})
export class BurgerMenuComponent implements OnInit {
  public inputText:string = ""
  public foco:boolean = false
  public focoBuscador:boolean = false
  public coincidencia:string[] = ['','Hey como estas',"adios amigo","sss","dd"]
  public imageProfile:string = 'https://media-exp1.licdn.com/dms/image/C5603AQHgQm5806sx2A/profile-displayphoto-shrink_200_200/0/1541434175803?e=1621468800&v=beta&t=MOKmnJRHHZuVXWS2uTrRQvfKVEl3nVDhvMssTmYw79o'


  constructor(private apiService:MicronutrientesService, private servicioReceta:RecetasService) 
  {}

   
   onFocusEvent(event: any)
   {
      console.log(this.coincidencia);
    /*   this.foco = true */
      console.log(event.target.value)
      console.log(this.foco);
  }

   perderfoco()
   {
    this.foco = false
   }
   buscadorSwitch()
   {
     this.focoBuscador = true
   }


  ngOnInit(): void {
    if(this.apiService.micronutrientes.length == 0 ){
    this.apiService.getMicros().subscribe((data:any)=>
    { console.log(data.message)
      if(data.type = 1){
        
      this.apiService.micronutrientes = data.res
      }
      console.log("Acabo de cargar getMicros")
      console.log(data.res)
    })
    }
    if(this.servicioReceta.recetas.length == 0){
      this.servicioReceta.getRecetas().subscribe((data:any)=>
      {
        if(data.type = 1){
        this.servicioReceta.recetas = data.res
        }
        console.log("Acabo de cargar recetas")
        console.log(data.res)
      })
    }
  }
}


