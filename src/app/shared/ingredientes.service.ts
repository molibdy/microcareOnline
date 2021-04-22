import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Allergen } from '../models/allergen';
import { Dietas } from '../models/dietas';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientesService {
  public Ingredientes:Ingredient[] = []

  private url = 'https://api-rest-microcare.herokuapp.com/ingredientes'
  //private url = 'http://localhost:300/ingredientes'
  public dietas:Dietas[]=[];
  public ingredientesAvoid:Ingredient[]
  public alergenos:Allergen[]=[];
  public ingredientesRicos: Ingredient[] = []
  public alergias:Allergen[]

  constructor(private http:HttpClient) {
    // this.dietas=[]
    // this.ingredientesAvoid = []
    // this.alergenos = []
   }

 
  
  


  getIngredientes(){
    return this.http.get(this.url)
  } 
  getAlergenos(){
    return this.http.get(this.url + '/allergen')
  } 

  getDietas(){
    return this.http.get(this.url + '/dietas')
  } 


 



  getIngredientesAvoid(){
    return this.http.get(this.url + '/avoid')
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



