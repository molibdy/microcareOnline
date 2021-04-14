import { group } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
import { Group } from 'src/app/models/group';
import { Progress } from 'src/app/models/progress';
import { LoginInfoService } from 'src/app/shared/login-info.service';
import { ProgressService } from 'src/app/shared/progress.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  
  public date:Date;
  public dateString:string;

  public errorMessage:string;
  constructor(public progressService:ProgressService, private userService:LoginInfoService) {
    this.date=new Date()
    this.dateString=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`
    this.errorMessage='';
  }
  
  // public rellenarGrupos(){

  //   //Rellena el atributo groups de progressService para rellenar los chart-components
  //   this.progressService.getGroups(this.userService.user.user_id,this.dateString)
  //   .subscribe((grupos:any)=>{
  //       if(grupos.type==1){
  //         this.progressService.groups=grupos.message;
  //         for(let i=0;i<this.progressService.groups.length;i++){
  //           if(this.progressService.groups[i].name=='vitaminas'){
  //             this.progressService.vitaminas=this.progressService.groups[i] 
  //           }
  //           else if(this.progressService.groups[i].name=='minerales'){
  //             this.progressService.minerales=this.progressService.groups[i]
  //           }
  //           else if(this.progressService.groups[i].name=='aminoácidos'){
  //             this.progressService.aminoacidos=this.progressService.groups[i]
  //           }
  //           else if(this.progressService.groups[i].name=='oligoelementos'){
  //             this.progressService.oligoelementos=this.progressService.groups[i]
  //           }
  //         }
  //       }else{
  //         this.errorMessage=grupos.message;
  //       }
  //       console.log(grupos.message)
  //   });
  // }

  ngOnInit(): void {
    console.log(this.userService.user)
    // this.progressService.startAll(this.userService.user.user_id,this.dateString)
    // .subscribe((data:any)=>{
    //   if(data.type==1){
    //     this.progressService.totalProgress=data.message
    //     this.rellenarGrupos()
    //   }
    //   else if(data.type==-1){
    //     for(let i=1;i<38;i++){
    //       let progreso=new Progress(this.userService.user.user_id,this.dateString,i,20)
    //       this.progressService.startProgress(progreso)
    //       .subscribe((added:any)=>{
    //         console.log(added.message)
    //       })
    //     }
    //     this.rellenarGrupos()
    //   }
    //   else{
    //   this.errorMessage=data.message;
    // }
    // })
  }

}


