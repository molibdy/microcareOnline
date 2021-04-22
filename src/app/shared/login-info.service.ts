import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferencias } from '../models/preferencias';


@Injectable({
  providedIn: 'root'
})

export class LoginInfoService{
  
   private url = 'https://api-rest-microcare.herokuapp.com/usuario'
  //private url = 'http://localhost:300/usuario'
  
  public isDentro:boolean = false
  public router:Router;
  public isNonRegistered:boolean = false
 
  public user:User = new User(0,"","")
  public preferencias:Preferencias=new Preferencias()
  constructor(private http:HttpClient) { 
 
  }

  /////////////////////////metodos de registro




  getUsuario(username:string){
    return this.http.get(this.url + '?username=' + username)
  }

  getUsuarioChanged(user_id:number){
    return this.http.get(this.url + '?user_id=' + user_id)
  }

  postUsuario(signUpInfo){
    return this.http.post(this.url + "/registro", signUpInfo)
  }



  obtenerUsuario(loginInfo:any){
  return this.http.post(this.url + '/login' , loginInfo)
  }


  putUsuario(configuracion){
    return this.http.put(this.url + '/config' , configuracion)
  }


  getPreferences(user_id:number){
    return this.http.get(this.url +'/preferencias?user_id='+ user_id)
  }


  deletePreferencias(ruta:string,preferencia_id:number){
    return this.http.delete(`${this.url}/preferencias?ruta=${ruta}&user_id=${this.user.user_id}&preferencia_id=${preferencia_id}`)
  }

  postPreferencias(ruta:string,preferencia_id:number){
    return this.http.post(this.url +'/preferencias', {ruta: ruta, user_id:this.user.user_id, preferencia_id:preferencia_id})
  }

}
