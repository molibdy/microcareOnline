import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientesService {

  // private url = 'https://api-rest-microcare.herokuapp.com/ingredientes'
  private url = 'http://localhost:300/ingredientes'
  
  constructor(private http:HttpClient) { }


  getIngredientes(){
    return this.http.get(this.url)
  } 


}



