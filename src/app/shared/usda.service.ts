import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsdaService {
  public ingredient_id:number
  constructor(private http:HttpClient ) { 
    this.ingredient_id=1103193  //zanahoria
    
  }


  getIngredient(ingredient_id:number){
    return this.http.get(`https://api.nal.usda.gov/fdc/v1/food/${ingredient_id}?nutrients=301,305,307,306,312,304,309,303,317,618,619,404,405,406,417,320,401,328,323,430,415,421,418&api_key=ZgpM9T0LKIiN0XuraVIocCPtpMql77B017ftJhP4`);
  }


  postMicronutrients(body:any){
    return this.http.post('http://localhost:300/ingredientes/micronutrientes',body)
  }


 
}
