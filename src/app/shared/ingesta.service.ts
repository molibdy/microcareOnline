import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngestaService {
  public date=new Date()
  public dateString=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`
  public intakeID:number = 0
 // private url = 'https://api-rest-microcare.herokuapp.com/ingestas'
 private url = 'http://localhost:300/ingestas'


  constructor(private http:HttpClient) { 

  }

  postIntake(intake){
    
    return this.http.post(this.url , intake)
  }
  guardarFavoritos(favorito){
    return this.http.post(this.url + '/favoritos', favorito )
  }


}
