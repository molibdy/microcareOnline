import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class LoginInfoService{
  
  private url = 'https://api-rest-microcare.herokuapp.com/usuario'
  // private url = 'http://localhost:300/usuario'
  
  public isDentro:boolean = false

  
  public router:Router;
  public isNonRegistered:boolean = false

  
  public user:User = new User(0,"","","")

  
  
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

datosLogin(username:string , password:string){
  this.user.username = username
  this.user.password = password
  this.obtenerUsuario(this.user).subscribe((data:any)=>
  {
    console.log(data.message)
    this.user = new User(data.message[0].user_id, data.message[0].username, data.message[0].password, data.message[0].email)
    console.log(this.user)
  })
}



}
