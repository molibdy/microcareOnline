import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry', "crustaceo", "frutosSecos", "gluten", "huevo", "leche", "moluscos","mostaza", "pescado", "sesamo", "sulfitos", "altramuces"];
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild('alergiaInput') alergiaInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto1') matAutocomplete1 : MatAutocomplete;




  alergiasCtrl = new FormControl();
  filteredAlergias: Observable<string[]>;
  alergias: string[] = ['altramuces'];
  public totalAlergias:string[]=["apio","cacahuetes", "crustaceo", "frutosSecos", "gluten", "huevo", "leche", "moluscos","mostaza", "pescado", "sesamo", "sulfitos", "altramuces"]

///// contructor 
  constructor() {
  this.desplegable1
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

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
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
    if(this.isVegano){

    }
    if(this.isVegetariano){

    }
    

  }
  preferenciasDieta(i){
    if(i == 1){
      this.isVegetariano = true
    }
    if(i==2){
      this.isVegano = true
    }
  }
  
  

}
