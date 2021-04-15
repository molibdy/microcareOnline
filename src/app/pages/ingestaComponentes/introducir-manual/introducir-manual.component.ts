
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { IngestaService } from 'src/app/shared/ingesta.service';




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
  constructor(private ingestaService:IngestaService) { }
  
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
    );
    console.log(this.filteredOptions);

  }

  crearIngrediente(ingrediente : string, peso:number)
  {
    if(ingrediente.length > 0 && peso > 0){
      console.log(ingrediente);
      console.log("pasa");
      this.listaIngredientes.push({ingrediente: ingrediente, peso : peso})
    }
    else{
      console.log(this.listaIngredientes);
      console.log("hey");
    }
  }

  quitarIngrediente(i:number){
    this.listaIngredientes.splice(i,1)

  }
  registrarIngesta()
  {
    if(true)
    {
      let userSession = JSON.parse(sessionStorage.getItem('userSession')).user_id
      console.log(userSession);
      
      let intake = {user_id:  userSession, date: this.dateString, ingredientes: this.listaIngredientes}
      this.ingestaService.postIntake(intake).subscribe((data:any)=>{
        console.log('callback de la ingesta');
        console.log(data);
        this.ingestaService.intakeID = data.message
        this.hiddenIngesta = true;

      })
      console.log(this.listaIngredientes);
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
    let favoritoObject = {user_id: userSession, name: favorito, intake_id: this.ingestaService.intakeID}
    this.showGuardarFavorito=true
    this.ingestaService.guardarFavoritos(favoritoObject).subscribe((data:any) => {


    })
  }
  anadirFavorito(){
    this.showGuardarFavorito = true
  }


  

///////// Recogida de datos //////////////












}