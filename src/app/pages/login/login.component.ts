
import { Component, OnInit } from '@angular/core';
import { LoginInfoService } from 'src/app/shared/login-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

import { ProgressService } from 'src/app/shared/progress.service';
import { Progress } from 'src/app/models/progress';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

public loginForm: FormGroup
public isNonRegisteredC:boolean = false
  

public date=new Date()
public dateString=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`


  constructor(private formBuilder: FormBuilder, private apiService: LoginInfoService, public progressService:ProgressService, private router:Router) { 
    this.buildForm()
    this.router=router
 
  }
  
  

  public entrar(){
    this.apiService.isDentro=true
  }

 
  buildForm(){
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    })

  }

  logearse(){
    let loginInfo={username: this.loginForm.value.username, password : this.loginForm.value.password} 

    this.apiService.obtenerUsuario(loginInfo)
    .subscribe((data:any)=>
    { console.log("primer filtro");
      console.log(`Obtener usuario: ${data.type}`);
      if(data.type == 1){
        console.log(data.message)
        this.apiService.user = new User(data.message[0].user_id, data.message[0].username, data.message[0].profile_picture)
        sessionStorage.setItem('userSession',JSON.stringify(this.apiService.user))
        
        
        console.log(data.message)
        this.progressService.getAverageProgress(JSON.parse(sessionStorage.getItem('userSession')).user_id)  //  Obtiene la media del progreso del user por fechas
        .subscribe((average:any)=>{
          console.log(`Obtener average progress: ${average.type}`);
          if(average.type==1 || average.type== -1){
            this.progressService.averageProgress=average.message
            sessionStorage.setItem('averageProgress',JSON.stringify(this.progressService.averageProgress))
            console.log(this.progressService.averageProgress)
            this.progressService.getAverageProgressTotal()         //Obtiene la media del progreso de todos los users por fechas
            .subscribe((averageTotal:any)=>{
              console.log(`Obtener average progress total: ${averageTotal.type}`);
              if(averageTotal.type==1 || average.type== -1){
                this.progressService.averageProgressTotal=averageTotal.message
                sessionStorage.setItem('averageProgressTotal',JSON.stringify(this.progressService.averageProgressTotal))
                console.log(this.progressService.averageProgressTotal)
                console.log('dateString antes de get Progress: ' + this.dateString)
                this.progressService.getProgress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString) //Obtiene el progreso para cada micronutriente del user hoy
                .subscribe((progresoUser:any)=>{
                  console.log(`Obtener progreso: ${progresoUser.type}`);
                  if(progresoUser.type==1){
                    this.progressService.totalProgress=progresoUser.message  //Rellena totalProgress con el array de jsons del progreso de cada micronutriente
                    sessionStorage.setItem('totalProgress',JSON.stringify(this.progressService.totalProgress))
                    this.progressService.getGroups(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString)   //Obtiene la media de progreso para cada grupo y rellena el atributo groups
                    .subscribe((grupos:any)=>{
                      console.log(`Obtener grupos: ${grupos.type}`);
                      if(grupos.type==1){
                        this.progressService.groups=grupos.message;
                        sessionStorage.setItem('groups',JSON.stringify(this.progressService.groups))
                        for(let i=0;i<this.progressService.groups.length;i++){
                          if(this.progressService.groups[i].name=='vitaminas'){
                            this.progressService.vitaminas=this.progressService.groups[i] 
                            sessionStorage.setItem('vitaminas',JSON.stringify(this.progressService.vitaminas))
                          }
                          else if(this.progressService.groups[i].name=='minerales'){
                            this.progressService.minerales=this.progressService.groups[i]
                            sessionStorage.setItem('minerales',JSON.stringify(this.progressService.minerales))
                          }
                          else if(this.progressService.groups[i].name=='aminoácidos'){
                            this.progressService.aminoacidos=this.progressService.groups[i]
                            sessionStorage.setItem('aminoacidos',JSON.stringify(this.progressService.aminoacidos))
                          }
                          else if(this.progressService.groups[i].name=='oligoelementos'){
                            this.progressService.oligoelementos=this.progressService.groups[i]
                            sessionStorage.setItem('oligoelementos',JSON.stringify(this.progressService.oligoelementos))
                          }
                        }
                        this.router.navigate(['home']);
                      }
                      console.log(grupos.message)
                    });
                  
                  }
                  else if(progresoUser.type==-1){
                      let progreso={user_id: JSON.parse(sessionStorage.getItem('userSession')).user_id,date: this.dateString,percent: 0}
                      this.progressService.startProgress(progreso)  //inserta un nuevo registro de progreso para cada micronutriente en fecha hoy y percent=0
                      .subscribe((added:any)=>{
                        console.log(`start progress: ${added.type}`);
                        console.log(added.message)
                        this.progressService.getGroups(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString)   //Obtiene la media de progreso para cada grupo y rellena el atributo groups
                    .subscribe((grupos:any)=>{
                      console.log(`Obtener grupos: ${grupos.type}`);
                      if(grupos.type==1){
                        this.progressService.groups=grupos.message;
                        sessionStorage.setItem('groups',JSON.stringify(this.progressService.groups))
                        for(let i=0;i<this.progressService.groups.length;i++){
                          if(this.progressService.groups[i].name=='vitaminas'){
                            this.progressService.vitaminas=this.progressService.groups[i] 
                            sessionStorage.setItem('vitaminas',JSON.stringify(this.progressService.vitaminas))
                          }
                          else if(this.progressService.groups[i].name=='minerales'){
                            this.progressService.minerales=this.progressService.groups[i]
                            sessionStorage.setItem('minerales',JSON.stringify(this.progressService.minerales))
                          }
                          else if(this.progressService.groups[i].name=='aminoácidos'){
                            this.progressService.aminoacidos=this.progressService.groups[i]
                            sessionStorage.setItem('aminoacidos',JSON.stringify(this.progressService.aminoacidos))
                          }
                          else if(this.progressService.groups[i].name=='oligoelementos'){
                            this.progressService.oligoelementos=this.progressService.groups[i]
                            sessionStorage.setItem('oligoelementos',JSON.stringify(this.progressService.oligoelementos))
                          }
                        }
                        this.router.navigate(['home']);
                      }
                      console.log(grupos.message)
                        });
                      })
                  }
                })
              }  
            })
          }
        })


      }else if(data.type == -1){
        console.log(data.message);
        console.log('error');

// MANDAR MENSAJE DE USUARIO/PASSWORD INCORRECTOS

        // sessionStorage.setItem('userSession',JSON.stringify(this.apiService.user))
        // console.log(sessionStorage.getItem('userSession'));
        // this.router.navigate(['home']);


        
          this.isNonRegisteredC = true 
      }
      
    })
  
  }

  
  ngOnInit(): void {
    // if(this.isNonRegisteredC != false){
    //   this.isNonRegisteredC = true
    // }

  }
  
}
