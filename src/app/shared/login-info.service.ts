import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class LoginInfoService{
  
  private url = 'http://localhost:300/usuario'
  
  public isDentro:boolean = false
  public user:User
  
  constructor(private http:HttpClient) { 
  }

  /////////////////////////metodos de registro


 postUsuario(newUser:User){
   return this.http.post(this.url, newUser)
 }

 getUsuario(username:string){
   return this.http.get(this.url + '?username=' + username)
 }



  loginUsuario(username:string , password:string){
  return this.http.post(this.url + '/login' + username , password)
  }



}
