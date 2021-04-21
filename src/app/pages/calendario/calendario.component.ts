import { Component, OnInit } from '@angular/core';
import { PlannedRecipe } from 'src/app/models/planned-recipe';
import { Progress } from 'src/app/models/progress';
import { Recipes } from 'src/app/models/recipes';
import { ProgressService } from 'src/app/shared/progress.service';
import { RecetasService } from 'src/app/shared/recetas.service';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
 
  public date:Date;
  public fecha:string;
  public dateString:string;
  public plannedRecipes:PlannedRecipe[];
  public consumedRecipes:PlannedRecipe[];
  public retos:string[];
  constructor(public recetasService:RecetasService,
    private progressService:ProgressService) { 
    this.date=new Date();
    this.fecha=this.dateToFecha()
    this.dateString=this.dateToString(this.date)
    // this.plannedRecipes=[]
    // this.consumedRecipes=[]
    this.getPlannedRecipes(this.dateString)
    this.retos=['2 kiwis','30g nueces','añade 10g de cúrcuma a una receta']
  }

  getPlannedRecipes(date:string){
    this.recetasService.getPlannedRecetas(JSON.parse(sessionStorage.getItem('userSession')).user_id,date)
    .subscribe((recetas:any)=>{
      if(recetas.type==1 || recetas.type==-1){
        this.plannedRecipes=[]
        this.consumedRecipes=[]
        for(let i=0;i<recetas.message.length;i++){
          if(recetas.message[i].isConsumed){
            this.consumedRecipes.push(recetas.message[i])
          }else{
            this.plannedRecipes.push(recetas.message[i])
          }
        }
      }
    })
  }


  addRegister(recipe_id:number,planned_recipe_id){
   //añade microscore de la receta/reto con el id indicado al registro del día
   let selectedReceta=new Recipes();
   for(let i=0;i<this.recetasService.recetas.length;i++){
     if(this.recetasService.recetas[i].recipe_id==recipe_id){
      selectedReceta=this.recetasService.recetas[i]
     }
   }
   this.progressService.updateProgress(new Progress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString,selectedReceta.microscore))
      .subscribe((updated:any)=>{
        console.log('progreso añadido, type' + updated.type)
        if(updated.type==1 || updated.type==2){

          this.progressService.getProgress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString)
          .subscribe((progreso:any)=>{
            this.progressService.totalProgress.percents=progreso.message
            sessionStorage.setItem('totalProgress',JSON.stringify(this.progressService.totalProgress))

            this.recetasService.updatePlannedRecipe(planned_recipe_id,true).subscribe((consumida:any)=>{
              console.log('consumida, type ' + consumida.type)
              this.getPlannedRecipes(this.dateToString(this.date))
            })
          })
        }
      })
  }



  deletePlan(planned_recipe_id:number){
    
    console.log('entrando en deletion')
    this.recetasService.deletePlannedRecipe(planned_recipe_id).subscribe((deletion:any)=>{
      console.log(deletion)
      if(deletion.type==1){
        console.log(deletion)
        this.getPlannedRecipes(this.dateToString(this.date))
      }
    })
  }

  deshacer(recipe_id:number,planned_recipe_id){
      let selectedReceta=new Recipes();
      for(let i=0;i<this.recetasService.recetas.length;i++){
        if(this.recetasService.recetas[i].recipe_id==recipe_id){
         selectedReceta=this.recetasService.recetas[i]
        }
      }
      this.progressService.removeProgress(new Progress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString,selectedReceta.microscore))
         .subscribe((updated:any)=>{
           console.log('progreso añadido, type' + updated.type)
           if(updated.type==1 || updated.type==2){
   
            this.progressService.getProgress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString)
            .subscribe((progreso:any)=>{
              this.progressService.totalProgress.percents=progreso.message
              sessionStorage.setItem('totalProgress',JSON.stringify(this.progressService.totalProgress))
  
              this.recetasService.updatePlannedRecipe(planned_recipe_id,false)
              .subscribe((consumida:any)=>{
              console.log('consumida, type ' + consumida.type)
              this.getPlannedRecipes(this.dateToString(this.date))
              })
          })
        }
      })
  
  }


  public nextDay(){
    this.date.setDate(this.date.getDate()+1)
    this.fecha=this.dateToFecha()
    this.getPlannedRecipes(this.dateToString(this.date))
  }

  public prevDay(){
    this.date.setDate(this.date.getDate()-1)
    this.fecha=this.dateToFecha()
    this.getPlannedRecipes(this.dateToString(this.date))
  }

  public fillRecipes(){
    // llama a todas las recetas de la tabla "plan" que tengan fecha= this.date 
    //this.plannedRecipes= data.result
  }

  public fillRetos(){
    // llama a todos los retos de la tabla "plan" que tengan fecha= this.date 
    //this.retos=data.result
  }





  private dateToString(date:Date){
    let mes=`${date.getMonth()+1}`
    if(String(date.getMonth()+1).length==1){
      mes=`0${date.getMonth()+1}`
    }
    let dia=`${date.getDate()}`
    if(String(date.getDate()).length==1){
      dia=`0${date.getDate()}`
    }
    return `${date.getFullYear()}-${mes}-${dia}`
  }

  private dateToFecha():string{
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


  ngOnInit(): void {
  }

}
