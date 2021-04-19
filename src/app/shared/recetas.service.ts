
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlannedRecipe } from '../models/planned-recipe';
import { Recipes } from '../models/recipes';


@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  public recetas:Recipes[];
  public recetasParaTi:Recipes[]
  public selectedReceta:Recipes;

  public plannedRecipes:Recipes[]=[]
  public selectedDate:string;

  // private url = 'https://api-rest-microcare.herokuapp.com/recetas'
  private url = 'http://localhost:300/recetas'

  public recetasRicas: Recipes[]

  constructor(private http:HttpClient) {
    this.recetas = []
    this.recetasParaTi=[]
    this.selectedReceta=new Recipes()
    this.recetasRicas = []
    this.selectedDate=''
   }

 

  getRecetas(){
    return this.http.get(this.url)
  }

  getRecetasParaTi(user_id:number,date:string){
    return this.http.get(`${this.url}/parati?user_id=${user_id}&date=${date}`)
  }


  getPlannedRecetas(user_id:number,date:string){
    return this.http.get(`${this.url}/planeadas?user_id=${user_id}&date=${date}`)
  }


  addRecipeToPlan(addRecipe:PlannedRecipe){
    return this.http.post(`${this.url}/planeadas`, addRecipe)
  }

  consumeRecipe(planned_recipe_id:number){
    return this.http.put(`${this.url}/planeadas`, {planned_recipe_id:planned_recipe_id, isConsumed:true})
  }


  getRecetasDetails(){
    return this.http.get(this.url + '/detalles')
  }

}


