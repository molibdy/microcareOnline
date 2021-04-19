import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientesService {

  // private url = 'https://api-rest-microcare.herokuapp.com/ingredientes'
  private url = 'http://localhost:300/ingredientes'

  public ingredientesRicos: Ingredient[] = []
  
  constructor(private http:HttpClient) { }


  getIngredientes(){
    return this.http.get(this.url)
  } 


  getIngredientesMicro(micronutrient_id){
    return this.http.get(this.url + '/micronutrientes?micronutrient_id=' + micronutrient_id)
  }

}



