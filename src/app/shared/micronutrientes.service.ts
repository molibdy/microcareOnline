import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MicronutrientesService {

  public micronutrientes=[]
  // private url = 'https://api-rest-microcare.herokuapp.com/micronutrientes'
  private url = 'http://localhost:300/micronutrientes'

  constructor(private http:HttpClient) { }


  getMicros(){
    return this.http.get(this.url)
  }



}
