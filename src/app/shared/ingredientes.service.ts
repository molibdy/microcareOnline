import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Allergen } from '../models/allergen';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientesService {
  public Ingredientes:Ingredient[] = []

  // private url = 'https://api-rest-microcare.herokuapp.com/ingredientes'
  private url = 'http://localhost:300/ingredientes'
  public tipoDieta:number;
  public ingredientesAvoid:Ingredient[]
  public alergenos:Allergen[]
  constructor(private http:HttpClient) {
    this.tipoDieta = 0
    this.ingredientesAvoid = []
    this.alergenos = []
   }


  getIngredientes(){
    return this.http.get(this.url)
  } 
  getIngredientesAvoid(){
    return this.http.get(this.url + '/avoid')
  } 
  postIngredientesAvoid(ingrediente){
    return this.http.post(this.url + '/avoid', ingrediente)
  }
  

}



