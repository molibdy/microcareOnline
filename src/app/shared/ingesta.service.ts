import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favourites } from '../models/favourites';

@Injectable({
  providedIn: 'root'
})
export class IngestaService {
  public date=new Date()
  public dateString=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`
  public lastIntake = {intake_id: 0, microscore: []}
  public introducirRecetaBooleano:boolean = false;


//  private url = 'https://api-rest-microcare.herokuapp.com/ingestas'
 private url = 'http://localhost:300/ingestas'
 public listaFavoritos:Favourites[] = []


  constructor(private http:HttpClient) { 

  }

  postIntake(intake){
    
    return this.http.post(this.url , intake)
  }
  guardarFavoritos(favorito){
    return this.http.post(this.url + '/favoritos', favorito )
  }
  mostrarFavoritos(){
    return this.http.get(this.url + "/favoritos?user_id=" + JSON.parse(sessionStorage.getItem('userSession')).user_id)
    
  }
  quitarFavoritos(borrando:Favourites){
    return this.http.delete(this.url + "/favorito?favourite_id=" + borrando.favourite_id)
  }


}
function userSession(userSession: any) {
  throw new Error('Function not implemented.');
}

