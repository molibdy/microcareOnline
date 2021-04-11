import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
 
  public date:Date;
  public fecha:string;
  public plannedRecipes:string[];
  public retos:string[];
  constructor() { 
    this.date=new Date();
    this.fecha=this.dateString()
    this. plannedRecipes=['pollo al curry', 'pimientos rellenos', 'espinacas con beschamel']
    this.retos=['2 kiwis','30g nueces','añade 10g de cúrcuma a una receta']
  }

  public dateString():string{
    let dia='';
    let mes='';
    switch(this.date.getDay()){
      case 0:
        dia='dom';
        break;
      case 1:
        dia='lun';
        break;
      case 2:
        dia='mar';
        break;
      case 3:
        dia='mie';
        break;
      case 4:
        dia='jue';
        break;
      case 5:
        dia='vie';
        break;
      case 6:
        dia='sab';
        break;
          
    }
    switch(this.date.getMonth()){
      case 0:
        mes='enero';
        break;
      case 1:
        mes='febrero';
        break;
      case 2:
        mes='marzo';
        break;
      case 3:
        mes='abril';
        break;
      case 4:
        mes='mayo';
        break;
      case 5:
       mes='junio';
        break;
      case 6:
        mes='julio';
        break;
      case 7:
        mes='agosto';
        break;
      case 8:
        mes='septiembre';
        break;
      case 9:
        mes='octubre';
        break;
      case 10:
        mes='noviembre';
        break;
      case 11:
        mes='diciembre';
        break;        
    }

    return `${dia}, ${this.date.getDate()} ${mes}`
  }

  public nextDay(){
    this.date.setDate(this.date.getDate()+1)
    this.fecha=this.dateString()
  }

  public prevDay(){
    this.date.setDate(this.date.getDate()-1)
    this.fecha=this.dateString()
  }

  public fillRecipes(){
    // llama a todas las recetas de la tabla "plan" que tengan fecha= this.date 
    //this.plannedRecipes= data.result
  }

  public fillRetos(){
    // llama a todos los retos de la tabla "plan" que tengan fecha= this.date 
    //this.retos=data.result
  }


  public addRegister(id:number){
    //añade microscore de la receta/reto con el id indicado al registro del día
  }


  ngOnInit(): void {
  }

}
