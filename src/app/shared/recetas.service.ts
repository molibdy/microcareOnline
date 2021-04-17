
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipes } from '../models/recipes';


@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  public recetas
  public selectedReceta :Recipes 
  //private url = 'https://api-rest-microcare.herokuapp.com/recetas'
  private url = 'http://localhost:300/recetas'

  constructor(private http:HttpClient) {
    this.recetas = []
    this.selectedReceta = new Recipes(0,"","","",0)
   }

 

  getRecetas(){
    return this.http.get(this.url)
  }


  getPlannedRecetas(user_id:number){}
  rutaReceta(){
    return
  }

}


