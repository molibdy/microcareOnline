import { Ingredient } from 'src/app/models/ingredient';

import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { IngestaService } from 'src/app/shared/ingesta.service';
import { IngredientesService } from 'src/app/shared/ingredientes.service';
import { Progress } from 'src/app/models/progress';
import { ProgressService } from 'src/app/shared/progress.service';




@Component({
  selector: 'app-introducir-manual',
  templateUrl: './introducir-manual.component.html',
  styleUrls: ['./introducir-manual.component.css']
})
export class IntroducirManualComponent implements OnInit {

  ///// formulario autocompletado

  myControl = new FormControl();
  options: string[] = ['Pollo', 'Patata', 'Zanahoria','Cebolla'];
  filteredOptions: Observable<string[]>;
  
  public ingestas:object[] = []
  public pasos:string = "";
  public receta:object
  public listaIngredientes:Object[] = []
  public recetas:object[] = []
  public isRecAnadida:boolean = false
  public hiddenIngesta:boolean = false;
  public date=new Date()
  public dateString=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`

  public showGuardarFavorito:boolean=false;
  constructor(private ingestaService:IngestaService,   
              private ingredientService:IngredientesService,
              private progressService:ProgressService) 
    {

    this.options = []
    for(let i =0;i<this.ingredientService.Ingredientes.length;i++){
      this.options.push(this.ingredientService.Ingredientes[i].ingredient_name)
    }
    this.options.sort()
    console.log(this.options)
/*     this.getIngredientes()
 */   }
  
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
    );
    console.log(this.filteredOptions);

  }
  getIngredientes(){
    for(let i =0; i<this.ingredientService.Ingredientes.length;i++){
       this.options.push(this.ingredientService.Ingredientes[i].ingredient_name)
    }
  
  }

  crearIngrediente(ingrediente : string, peso:number)
  {
    if(this.options.includes(ingrediente)  && peso > 0){
      console.log(ingrediente);
      console.log("pasa");
      for(let i=0;i<this.ingredientService.Ingredientes.length;i++){
          if(this.ingredientService.Ingredientes[i].ingredient_name == ingrediente){
            this.listaIngredientes.push({ingrediente: this.ingredientService.Ingredientes[i], peso : peso})
          }
      }
    }
    else{
      console.log("no está en la bbdd");
    }
    // this.myControl.setValue('')
  }

  quitarIngrediente(i:number){
    this.listaIngredientes.splice(i,1)

  }
  registrarIngesta()
  {
    if(true)
    {
      let userSession = JSON.parse(sessionStorage.getItem('userSession')).user_id
      
      let intake = {user_id:  userSession, date: this.dateString, ingredientes: this.listaIngredientes}
      this.ingestaService.postIntake(intake).subscribe((data:any)=>{
        console.log('post ingesta ' + data.type);
        
        this.ingestaService.lastIntake = {intake_id: data.intake_id, microscore: data.microscore}

        this.progressService.updateProgress(new Progress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString,this.ingestaService.lastIntake.microscore))
        .subscribe((updated:any)=>{
          console.log('progreso añadido, type' + updated.type)
          if(updated.type==1 || updated.type==2){
            this.progressService.getProgress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString)
            .subscribe((progreso:any)=>{
              this.progressService.totalProgress.percents=progreso.message
              sessionStorage.setItem('totalProgress',JSON.stringify(this.progressService.totalProgress))
              this.hiddenIngesta = true
              
            })
        

            
          }

        })
      
      })
    }
    else
    {

    }
  }
  registrarReceta(pasos:string, nombreReceta:string, imagenReceta:string){
   
    if(pasos.length>0){
      this.pasos = pasos;
      this.receta = {ingredientes: this.listaIngredientes , pasos : pasos, nombreReceta: nombreReceta, imagenReceta: imagenReceta }
      console.log(this.listaIngredientes);
      this.hiddenIngesta = true;
    }
    else{
      this.hiddenIngesta = false
    }
    
  }
  cerrarPasos()
  {
    this.isRecAnadida = false
  }
  switchReceta()
  {
    this.isRecAnadida = true
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  guardarFavorito(favorito){
    let userSession = JSON.parse(sessionStorage.getItem('userSession')).user_id
    console.log(favorito);
    
    let favoritoObject = {user_id: userSession, name: favorito, intake_id: this.ingestaService.lastIntake.intake_id}
    this.showGuardarFavorito=true
    this.ingestaService.guardarFavoritos(favoritoObject).subscribe((data:any) => {
      console.log(data);
      this.ingestaService.lastIntake.intake_id = data.intake_id
       this.ingestaService.introducirRecetaBooleano = false;


    })
  }
  anadirFavorito(){
    this.showGuardarFavorito = true
  }
  

}
  

///////// Recogida de datos //////////////











  
