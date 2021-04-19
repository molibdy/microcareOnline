import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class LoginInfoService{
  
  // private url = 'https://api-rest-microcare.herokuapp.com/usuario'
  private url = 'http://localhost:300/usuario'
  
  public isDentro:boolean = false
  public router:Router;
  public isNonRegistered:boolean = false
  public tipoDieta:number;
  public ingredientesAvoid:Object[]
  public alergenos:object[]
  public user:User = new User(0,"","")
  
  constructor(private http:HttpClient) { 
    this.tipoDieta = 0
    this.ingredientesAvoid = []
    this.alergenos = []
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




}
