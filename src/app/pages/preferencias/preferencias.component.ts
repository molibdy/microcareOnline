import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { LoginInfoService } from 'src/app/shared/login-info.service';
import { IngredientesService } from 'src/app/shared/ingredientes.service';
import { Ingredient } from 'src/app/models/ingredient';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.css']
})


///////// clase preferencias 

export class PreferenciasComponent implements OnInit {
  public inputText:string = ""
  public foco:boolean = false
  public coincidencia:string[] = ['','Hey como estas',"adios amigo","sss","dd"]
  public imageProfile:string = 'https://media-exp1.licdn.com/dms/image/C5603AQHgQm5806sx2A/profile-displayphoto-shrink_200_200/0/1541434175803?e=1621468800&v=beta&t=MOKmnJRHHZuVXWS2uTrRQvfKVEl3nVDhvMssTmYw79o'
  public desplegable1: boolean = false
  public desplegable2: boolean = false
  public desplegable3: boolean = false
  public desplegable4: boolean = false
  public chip1:string ="chip-grande"
  public chip2:string ="chip-grande"

/////// Guardar Alimentos excluidos

  public alimentosQueNo:string[]
  public isVegetariano:boolean = false
  public isVegano:boolean = false


  ///// material autocomplete 
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[];
  ObjectsIngredients: Ingredient[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild('alergiaInput') alergiaInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto1') matAutocomplete1 : MatAutocomplete;




  alergiasCtrl = new FormControl();
  filteredAlergias: Observable<string[]>;
  alergias: string[] = [];
  public totalAlergias:string[]=[]
  public ingredientesAnadidos:string[]=[]
///// contructor 
  constructor(private ingredientService:IngredientesService) {
/*   for(let i =0;i<this.ingredientService.ingredientesAvoid.length;i++){
    this.fruits.push(this.ingredientService.ingredientesAvoid[i].ingredient_name)
  } */
/*   this.getAllergens()
 */
  this.allFruits = []
  for(let i =0;i<this.ingredientService.Ingredientes.length;i++){
    this.allFruits.push(this.ingredientService.Ingredientes[i].ingredient_name)
    console.log(this.ingredientService.Ingredientes[i].ingredient_name); 
  }

  for(let i =0;i<this.ingredientService.alergenos.length;i++){
    this.totalAlergias.push(this.ingredientService.alergenos[i].allergen_name)
    console.log(this.ingredientService.alergenos[i].allergen_name);
    
  }
   this.getIngredientsAvoid()
 /*   this.getAlergias()
 */  this.desplegable1
  this.desplegable2
  this.desplegable3
  this.desplegable4
  this.chip1
  this.chip2

  this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    startWith(null),
    map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
    
  this.filteredAlergias = this.alergiasCtrl.valueChanges.pipe(
      startWith(null),
      map((alergia: string | null) => alergia ? this._filter2(alergia) : this.totalAlergias.slice()));

}


/// funciones movimiento rodri
  pulsar1(){
    if(this.desplegable1){
    this.desplegable1=false
    }
    else{
      this.desplegable1 =true
    }
   }

   pulsar4(){
    if(this.desplegable4){
    this.desplegable4=false
    }
    else{
      this.desplegable4 =true
    }
   }

   pulsar2(){
    if(this.desplegable2){
    this.desplegable2=false
    }
    else{
      this.desplegable2 =true
    }
   }

   pulsar3(){
    if(this.desplegable3){
    this.desplegable3=false
    }
    else{
      this.desplegable3 =true
    }
   }

   azul1(){
    if(this.chip1 == "chip-grande"){
    this.chip1 = "chip-grande-azul"
    }
    else {
      this.chip1 ="chip-grande"
    }
   }

   azul2(){
    if(this.chip2 == "chip-grande"){
    this.chip2 = "chip-grande-azul"
    }
    else {
      this.chip2 ="chip-grande"
    }
   }
////////////////////////////////
  ngOnInit(): void {

    
  }
/////////// metodos autocompletar
  getIngredientsAvoid(){    
      this.fruits = []
      this.ingredientService.ingredientesAvoid = []
     console.log(this.ingredientService);
      

      this.ingredientService.getIngredientesAvoid().subscribe((data:any) => {
        console.log(data.message);
        
      this.ingredientService.ingredientesAvoid = data.message
        for(let i =0;i<this.ingredientService.ingredientesAvoid.length;i++){
          this.fruits.push(this.ingredientService.ingredientesAvoid[i].ingredient_name)
        }
      })
  }

/*   getAlergias(){    
    this.alergias = []
    this.ingredientService.getAlergias().subscribe((data:any) => {
      console.log('alergiss'+data);
      
    this.ingredientService.alergias = data
      for(let i =0;i<this.ingredientService.alergias.length;i++){
        this.alergias.push(this.ingredientService.alergias[i].allergen_name)
      }
    })
}
  getAllergens(){
    this.ingredientService.getAlergenos().subscribe((alergenos:any)=>{
      this.ingredientService.alergenos = alergenos
      console.log(alergenos );
      
      for(let i =0;i<this.ingredientService.alergenos.length;i++){
        this.totalAlergias.push(this.ingredientService.alergenos[i].allergen_name)
      }

    })
  } */

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      if(!this.fruits.includes(value.trim())){
        this.fruits.push(value.trim());
        this.ingredientesAnadidos.push((value.trim()))
      }
      
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    

    this.fruitCtrl.setValue(null);
    console.log(this.ingredientesAnadidos);

  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
      this.ingredientService.ingredientesAvoid.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }


  add2(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.alergias.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.alergiasCtrl.setValue(null);
  }

  remove2(alergia: string): void {
    const index = this.alergias.indexOf(alergia);

    if (index >= 0) {
      this.alergias.splice(index, 1);
    }
  }

  selected2(event: MatAutocompleteSelectedEvent): void {
    this.alergias.push(event.option.viewValue);
    this.alergiaInput.nativeElement.value = '';
    this.alergiasCtrl.setValue(null);
    this.alergiaInput.nativeElement.blur()
  }

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.totalAlergias.filter(alergia => alergia.toLowerCase().indexOf(filterValue) === 0);
  }


  /// metodos recogida de datos

  guardarPreferencias(){
                         //// guarda toda la funcionalidad de guardar preferencias, funciona con llamadas a atributos del servicio
    if(!this.isVegano && !this.isVegetariano){
      this.ingredientService.tipoDieta = 0
                                                  //Ni vegano ni vegetariano
    }
    if(this.isVegetariano && !this.isVegano){
      this.ingredientService.tipoDieta = 2
    }                                             // Solo vegetariano
    if(this.isVegano && this.isVegetariano){
      this.ingredientService.tipoDieta = 3
    }
    if(this.isVegano && !this.isVegetariano){
      this.ingredientService.tipoDieta = 1
                                                      /// Solo vegano
    }

     /// aqui mete los ingredientes a evitar
     this.ingredientService.ingredientesAvoid = []

    for(let i =0; i<this.ingredientService.Ingredientes.length;i++){
     if( this.fruits.includes(this.ingredientService.Ingredientes[i].ingredient_name)){
       this.ingredientService.ingredientesAvoid.push(this.ingredientService.Ingredientes[i])
     }else{}
    }
   
      let userSession = JSON.parse(sessionStorage.getItem('userSession')).user_id
      let objetoIngredientes = {user_id: userSession, ingredientes: this.ingredientService.ingredientesAvoid}
      console.log(objetoIngredientes);
      
    
      this.ingredientService.postIngredientesAvoid(objetoIngredientes).subscribe((data:any)=>{
        console.log(data); 
        this.getIngredientsAvoid()
/*         this.ingredientService.alergias = []
 */
/*         for(let i =0; i<this.ingredientService.alergenos.length;i++){
         if( this.alergias.includes(this.ingredientService.alergenos[i].allergen_name)){
           this.ingredientService.alergias.push(this.ingredientService.alergenos[i])
         }else{}
        }
       
          let objetoAlergias = {user_id: userSession, alergias: this.ingredientService.alergias}
        
           this.ingredientService.postAlergias(objetoAlergias).subscribe((data:any)=>{
            console.log(data); 
            this.getAlergias()
          })  */


      })
    

           /// aqui mete los alergenos 
 
     
     
    /* this.ingredientService.alergenos.push(this.alergias) */ /// aqui mete los alergias a evitar
  /*   console.log(this.ingredientService.ingredientesAvoid);
    console.log(this.ingredientService.alergenos); */
    console.log(this.ingredientService.tipoDieta);
    

    
    


    

  }
  preferenciasDieta(i){
    if(i == 1){
      if(this.isVegetariano){
        this.isVegetariano = false
      }else{
        this.isVegetariano = true
      }
    }
    if(i==2){
      if(this.isVegano){
        this.isVegano = false
      }else{
        this.isVegano = true
      }    
    }
  }
  
  

}
function ingredient_name(ingredient_name: any) {
  throw new Error('Function not implemented.');
}

