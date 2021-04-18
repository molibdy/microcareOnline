import { Component, OnInit } from '@angular/core';
import { Progress } from 'src/app/models/progress';
import { Recipes } from 'src/app/models/recipes';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';
import { ProgressService } from 'src/app/shared/progress.service';
import { RecetasService } from 'src/app/shared/recetas.service';



@Component({
  selector: 'app-vista-receta',
  templateUrl: './vista-receta.component.html',
  styleUrls: ['./vista-receta.component.css']
})
export class VistaRecetaComponent implements OnInit {

  public selectedReceta:Recipes;

  // boton planear
  public showDatePicker:boolean;
  public selectedDate:string
  public isDateSelected:boolean;
  public goToPlan:string;

  //boton consumida
  public isConsumed:boolean;
  public alreadyConsumed:boolean
  public showAlreadyConsumed:boolean


  public date=new Date()
  public dateString=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`


  constructor(
    public micronutrientService:MicronutrientesService,
    public progressService:ProgressService,
    public recetasService:RecetasService
    ) { 
      this.selectedReceta=this.recetasService.selectedReceta
    
    this.showDatePicker=false
    this.selectedDate=''
    this.isDateSelected=false
    this.goToPlan=''
    this.isConsumed=false
    this.alreadyConsumed=false
    this.showAlreadyConsumed=false
  }





  public selectDate(){
    if(this.showDatePicker){
      this.showDatePicker=false
    }else{
      this.showDatePicker=true
    }
    this.isDateSelected=false
    this.showAlreadyConsumed=false
  }

  public addRegistro(){
    console.log('añadiendo registro')
    if(this.isConsumed){
      console.log('ya consumida')
      this.alreadyConsumed=true
      this.showAlreadyConsumed=true
    }else{
      console.log('añadiendo progreso')
       //Añade la microscore de la receta al progreso del user
      this.progressService.updateProgress(new Progress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString,this.selectedReceta.microscore))
      .subscribe((updated:any)=>{
        console.log('progreso añadido, type' + updated.type)
        if(updated.type==1 || updated.type==2){

          //Añade receta al día del user
          this.isConsumed=true;
        }
      })
     
      
    }
    this.isDateSelected=false
    this.showDatePicker=false
  }

  public addToDay(date:HTMLInputElement){
    if(date.value.length>0){
      this.selectedDate=date.value
      console.log(this.selectedDate)
      this.goToPlan=`../dia`  // añadir /${this.dateString(this.selectedDate)} para ir al día concreto?
      this.isDateSelected=true
      this.showDatePicker=false
      this.showAlreadyConsumed=false
      //Añade el id de la receta a la tabla de RecetasPlaneadas
    }
  }

  // private dateToString(date:string):string{
  //   return date.replace(/\//g,'')
  // }

  public cerrarDatePicker(){
    this.showDatePicker=false;
    this.isDateSelected=false;
    this.isConsumed=false
    this.showAlreadyConsumed=false
    console.log('cerrar')
  }

  ngOnInit(): void {

    
    // Tiene que haber un microscoreService que recibe los datos del microscore 
    // de la receta y es accedido por el componente microscoreChart
    // ESTÁ EN LA BUSQUEDA DE RECETAS
  }

}

