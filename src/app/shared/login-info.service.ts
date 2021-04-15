import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class LoginInfoService{
  
  private url = 'http://localhost:300/usuario'
  
  public isDentro:boolean = false
  public router:Router;
  public isNonRegistered:boolean = false
  public user:User = new User("","","")


  
  constructor(private http:HttpClient,  private _router:Router) { 
    this.router = _router
  }

  /////////////////////////metodos de registro




  getUsuario(username:string){
    return this.http.get(this.url + '?username=' + username)
  }
  postUsuario(newUser:User){
    return this.http.post(this.url + "/registro", newUser)
  }



    obtenerUsuario(user:User){
    return this.http.post(this.url + '/login' , user)
    }





}
