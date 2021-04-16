
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  public recetas
  //private url = 'https://api-rest-microcare.herokuapp.com/recetas'
  private url = 'http://localhost:300/recetas'

  constructor(private http:HttpClient) {
    this.recetas = []
   }


  getRecetas(){
    return this.http.get(this.url)
  }

<<<<<<< HEAD

  getPlannedRecetas(user_id:number){}
=======
  rutaReceta(){
    return
  }
>>>>>>> rodri

}


