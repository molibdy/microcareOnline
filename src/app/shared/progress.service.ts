import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../models/group';
import { Progress } from '../models/progress';
import { LoginInfoService } from './login-info.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  public groups:Group[]=[]
  public vitaminas:Group=new Group();
  public minerales:Group=new Group();
  public aminoacidos:Group=new Group();
  public oligoelementos:Group=new Group();

  public totalProgress:Progress[]=[]

  private url='http://localhost:300/progreso';
  constructor(private http:HttpClient ) { }



  // (Llamado desde HOME) Rellenar atributo groups con los cuatro grupos de micronutrientes:
  public getGroups(user_id:number,dateString:string){
    // Este post es un get, pero en formato post para proteger el id del usuario
    return this.http.post(`${this.url}/grupos`,{"user_id":user_id, "date":dateString});
  }


  public startProgress(progreso:Progress){
    return this.http.post(this.url +"/start",progreso);
  }


  public getProgress(user_id:number,dateString:string){
    return this.http.post(this.url,{"user_id":user_id, "date":dateString});
  }
  
}
