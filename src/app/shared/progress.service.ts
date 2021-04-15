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
  private url='https://api-rest-microcare.herokuapp.com/progreso';
  // private url='http://localhost:300/progreso';
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
  


  public rellenarGrupos(user_id:number,date:string){

    //Rellena el atributo groups de progressService para rellenar los chart-components
    this.getGroups(user_id,date)
    .subscribe((grupos:any)=>{
        if(grupos.type==1){
          this.groups=grupos.message;
          for(let i=0;i<this.groups.length;i++){
            if(this.groups[i].name=='vitaminas'){
              this.vitaminas=this.groups[i] 
            }
            else if(this.groups[i].name=='minerales'){
              this.minerales=this.groups[i]
            }
            else if(this.groups[i].name=='aminoácidos'){
              this.aminoacidos=this.groups[i]
            }
            else if(this.groups[i].name=='oligoelementos'){
              this.oligoelementos=this.groups[i]
            }
          }
        }
        console.log(grupos.message)
    });
  }



  public startAll(user_id:number,date:string){
    this.getProgress(user_id,date)
    .subscribe((data:any)=>{
      if(data.type==1){
        this.totalProgress=data.message
        this.rellenarGrupos(user_id,date)
      }
      else if(data.type==-1){
        for(let i=1;i<38;i++){
          let progreso=new Progress(user_id,date,i,20)
          this.startProgress(progreso)
          .subscribe((added:any)=>{
            console.log(added.message)
          })
        }
        this.rellenarGrupos(user_id,date)
      }
    })
  }
  
}
