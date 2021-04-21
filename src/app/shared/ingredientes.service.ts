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
  public ingredientesRicos: Ingredient[] = []
  public alergias:Allergen[]

  constructor(private http:HttpClient) {
    this.tipoDieta = 0
    this.ingredientesAvoid = []
    this.alergenos = []
   }

 
  
  


  getIngredientes(){
    return this.http.get(this.url)
  } 
  getAlergenos(){
    return this.http.get(this.url + '/all_allergen')
  } 
  getIngredientesAvoid(){
    return this.http.get(this.url + '/avoid')
  } 
  getAlergias(){
    return this.http.get(this.url + '/allergen')
  } 
  postIngredientesAvoid(ingrediente){
    return this.http.post(this.url + '/avoid', ingrediente)
  }
  postAlergias(alergias){
    return this.http.post(this.url + '/allergen', alergias)
  }
  

  getIngredientesMicro(micronutrient_id){
    return this.http.get(this.url + '/micronutrientes?micronutrient_id=' + micronutrient_id)
  }

}



