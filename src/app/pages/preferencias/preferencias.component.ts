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
  public chipDieta1:string ="chip-grande"
  public chipDieta2:string ="chip-grande"


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
  fruits: string[];
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
  constructor(public ingredientService:IngredientesService,
    public userService:LoginInfoService) {


    this.allFruits = []
    for(let i =0;i<this.ingredientService.Ingredientes.length;i++){
      this.allFruits.push(this.ingredientService.Ingredientes[i].ingredient_name)
    }

    this.totalAlergias = []
    for(let i =0;i<this.ingredientService.alergenos.length;i++){
      this.totalAlergias.push(this.ingredientService.alergenos[i].allergen_name)
    }


    this.fruits=[];
    for(let i =0;i<this.userService.preferencias.ingredientes.length;i++){
      this.fruits.push(this.userService.preferencias.ingredientes[i].ingredient_name)
    }
    console.log(this.userService.preferencias.alergenos)
    this.alergias=[];
    for(let i =0;i<this.userService.preferencias.alergenos.length;i++){
      this.alergias.push(this.userService.preferencias.alergenos[i].allergen_name)
      console.log(this.userService.preferencias.alergenos[i].allergen_name);
      
    }


    if(this.userService.preferencias.dietas.some((dieta)=>{
      return dieta.diet_id==this.ingredientService.dietas[0].diet_id
    })){
      console.log('tiene dieta 1')
      this.chipDieta1="chip-grande-azul"
    }

    if(this.userService.preferencias.dietas.some((dieta)=>{
      return dieta.diet_id==this.ingredientService.dietas[1].diet_id
    })){
      console.log('tiene dieta 2')
      this.chipDieta2="chip-grande-azul"
    }



    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
      
    this.filteredAlergias = this.alergiasCtrl.valueChanges.pipe(
        startWith(null),
        map((alergia: string | null) => alergia ? this._filter2(alergia) : this.totalAlergias.slice()));

}






preferenciasDieta(dieta_id:number){
  console.log(dieta_id)
  if(this.userService.preferencias.dietas.some((dieta)=>{
    return dieta.diet_id==dieta_id
  })){
    console.log('haciendo delete')
    this.userService.deletePreferencias('dietas',dieta_id).subscribe((deletion:any)=>{
      if(deletion.type==1){
        this.userService.getPreferences(this.userService.user.user_id).subscribe((preferencias:any)=>{
          this.userService.preferencias=preferencias.message
          if(dieta_id==this.ingredientService.dietas[0].diet_id){
            this.chipDieta1 = "chip-grande"
          }else if(dieta_id==this.ingredientService.dietas[1].diet_id){
            this.chipDieta2 = "chip-grande"
          }
         
        })
      }
    })
  }else{
    console.log('haciendo post')
    this.userService.postPreferencias('dietas',dieta_id).subscribe((addition:any)=>{
      if(addition.type==1){
        this.userService.getPreferences(this.userService.user.user_id).subscribe((preferencias:any)=>{
          this.userService.preferencias=preferencias.message
          if(dieta_id==this.ingredientService.dietas[0].diet_id){
            this.chipDieta1 = "chip-grande-azul"
          }else if(dieta_id==this.ingredientService.dietas[1].diet_id){
            this.chipDieta2 = "chip-grande-azul"
          }
        })
      }
    })
  }

  
}





////// REMOVE alergia   ///
remove2(alergia: string): void {
  const index = this.alergias.indexOf(alergia);

  if (index >= 0) {
    this.alergias.splice(index, 1);

    // delete de la bbdd
    for(let i=0;i<this.ingredientService.alergenos.length;i++){
      if(this.ingredientService.alergenos[i].allergen_name==alergia){
        this.userService.deletePreferencias('alergenos',this.ingredientService.alergenos[i].allergen_id).subscribe((deletion:any)=>{
          if(deletion.type==1){
            this.userService.getPreferences(this.userService.user.user_id).subscribe((preferencias:any)=>{
              this.userService.preferencias=preferencias.message
            })
          }
        })
      }
    }

  }
}


////// ADD  alergia   ///

selected2(event: MatAutocompleteSelectedEvent): void {

    // post a la bbdd
  for(let i=0;i<this.ingredientService.alergenos.length;i++){
    if(this.ingredientService.alergenos[i].allergen_name==event.option.viewValue){
      this.userService.postPreferencias('alergenos',this.ingredientService.alergenos[i].allergen_id).subscribe((addition:any)=>{
        if(addition.type==1){
          this.userService.getPreferences(this.userService.user.user_id).subscribe((preferencias:any)=>{
            this.userService.preferencias=preferencias.message
          })
        }
      })
    }
  }

  this.alergias.push(event.option.viewValue);
  this.alergiaInput.nativeElement.value = '';
  this.alergiasCtrl.setValue(null);
  this.alergiaInput.nativeElement.blur()
}

private _filter2(value: string): string[] {
  const filterValue2 = value.toLowerCase();

  return this.totalAlergias.filter(alergia => alergia.toLowerCase().indexOf(filterValue2) === 0);
}









////// REMOVE  avoid_ingredient   ///

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      // post a la bbdd
      for(let i=0;i<this.ingredientService.Ingredientes.length;i++){
        if(this.ingredientService.Ingredientes[i].ingredient_name==fruit){
          this.userService.deletePreferencias('avoidIngredients',this.ingredientService.Ingredientes[i].ingredient_id).subscribe((deletion:any)=>{
            console.log('haciendo delete')
            console.log(deletion.type)
            if(deletion.type==1){
              this.userService.getPreferences(this.userService.user.user_id).subscribe((preferencias:any)=>{
                this.userService.preferencias=preferencias.message
              })
            }
          })
        }
      }

    }
  }


  //// ADD  avoid_ingredient   ///

  selected(event: MatAutocompleteSelectedEvent): void {
    // post a la bbdd
    console.log('antes del for')
    for(let i=0;i<this.ingredientService.Ingredientes.length;i++){
      console.log('entrando al for')
      if(this.ingredientService.Ingredientes[i].ingredient_name==event.option.viewValue){
        this.userService.postPreferencias('avoidIngredients',this.ingredientService.Ingredientes[i].ingredient_id).subscribe((addition:any)=>{
          console.log('haciendo post')
          console.log(addition.type)
          if(addition.type==1){
            this.userService.getPreferences(this.userService.user.user_id).subscribe((preferencias:any)=>{
              this.userService.preferencias=preferencias.message
            })
          }
        })
      }
    }
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);

      

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
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

 
  ngOnInit(): void {

    
  }

}


