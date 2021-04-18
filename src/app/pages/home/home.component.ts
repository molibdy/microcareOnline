import { group } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { Progress } from 'src/app/models/progress';
import { LoginInfoService } from 'src/app/shared/login-info.service';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';
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
  constructor(public progressService:ProgressService, 
    private userService:LoginInfoService,
    public micronutrientService:MicronutrientesService,
    public router:Router) {
    this.date=new Date()
    this.dateString=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`
    this.errorMessage='';
  }

  public goToGroup(group_name:string){
    for (let i=0;i<this.micronutrientService.grupos.length;i++){
      if (this.micronutrientService.grupos[i].name==group_name){
        this.micronutrientService.selectedGroup=this.micronutrientService.grupos[i]
        console.log(this.micronutrientService.selectedGroup)
      }
    }
    this.router.navigate(['./home/grupo'])
  }


  ngOnInit(): void {
  

  }

}


