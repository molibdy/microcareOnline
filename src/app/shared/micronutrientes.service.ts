import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Micronutrients } from '../models/micronutrient';



@Injectable({
  providedIn: 'root'
})
export class MicronutrientesService {
  rutaMicro() {
    throw new Error('Method not implemented.');
  }

  public micronutrientes
  public microsReceta:any[];
  public microsIngesta:any[];
  public microsReto:any[];
  public selectedMicronutriente: Micronutrients 
 

  // private url = 'https://api-rest-microcare.herokuapp.com/micronutrientes'
  private url = 'http://localhost:300/micronutrientes'


  constructor(private http:HttpClient, ) { 

    this.microsReceta=[];
    this.microsIngesta=[];
    this.microsReto=[];
    this.selectedMicronutriente = new Micronutrients() 
    this.micronutrientes = []
    console.log(this.micronutrientes)

  }


  getMicros(){
    return this.http.get(this.url)
  }



  getMicrosReceta(recipe_id:number){
    return this.http.get(`${this.url}/receta?recipe_id=${recipe_id}`)
  }

  getMicrosRecetas(){
    return this.http.get(`${this.url}/receta`)
  }

  getMicrosIngesta(intake_id:number){
    return this.http.get(`${this.url}/ingesta?intake_id=${intake_id}`)
  }



  getMicrosReto(challenge_id:number){
    return this.http.get(`${this.url}/reto?challenge_id=${challenge_id}`)
  }


  getMicrosIngrediente(ingredient_id:number){}

  



}
