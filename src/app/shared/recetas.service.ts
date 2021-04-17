
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';


@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  public recetas:any[];
  public selectedReceta:Recipe;
  //private url = 'https://api-rest-microcare.herokuapp.com/recetas'
  private url = 'http://localhost:300/recetas'

  constructor(private http:HttpClient) {
    this.recetas = []
    this.selectedReceta=new Recipe()
   }


  getRecetas(){
    return this.http.get(this.url)
  }

  getRecetasParaTi(user_id:number){
    return this.http.get(this.url + '/parati')
  }


  getPlannedRecetas(user_id:number){}
  rutaReceta(){
    return
  }


  getRecetasDetails(){
    return this.http.get(this.url + '/detalles')
  }

}


