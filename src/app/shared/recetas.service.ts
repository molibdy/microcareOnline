
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipes } from '../models/recipes';


@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  public recetas:Recipes[];
  public recetasParaTi:Recipes[]
  public selectedReceta:Recipes;
  private url = 'https://api-rest-microcare.herokuapp.com/recetas'
  // private url = 'http://localhost:300/recetas'

  public recetasRicas: Recipes[]

  constructor(private http:HttpClient) {
    this.recetas = []
    this.recetasParaTi=[]
    this.selectedReceta=new Recipes()
    this.recetasRicas = []
   }

 

  getRecetas(){
    return this.http.get(this.url)
  }

  getRecetasParaTi(user_id:number,date:string){
    return this.http.get(`${this.url}/parati?user_id=${user_id}&date=${date}`)
  }


  getPlannedRecetas(user_id:number){}
  rutaReceta(){
    return
  }


  getRecetasDetails(){
    return this.http.get(this.url + '/detalles')
  }

}


