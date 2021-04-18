
import { Component, OnInit } from '@angular/core';
import { LoginInfoService } from 'src/app/shared/login-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

import { ProgressService } from 'src/app/shared/progress.service';
import { Progress } from 'src/app/models/progress';
import { Router } from '@angular/router';
import { RecetasService } from 'src/app/shared/recetas.service';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';


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


  constructor(private formBuilder: FormBuilder, 
    private apiService: LoginInfoService, 
    public progressService:ProgressService, 
    public recetaService:RecetasService,
    public micronutrientService:MicronutrientesService,
    private router:Router) { 
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
        console.log(data.message)  //  USER CORRECTO

        this.micronutrientService.getMicros()     //  Obtener array de micronutrientes
        .subscribe((micronutrients:any)=>{
          console.log(`Obtener micronutrientes: ${micronutrients.type}`);
          if(micronutrients.type == 1 || micronutrients.type == -2){
          this.micronutrientService.micronutrientes = micronutrients.message
          sessionStorage.setItem('micronutrientes',JSON.stringify(this.micronutrientService.micronutrientes))
          console.log(this.micronutrientService.micronutrientes)

          this.recetaService.getRecetas()      //  Obtener recetas
          .subscribe((recipes:any)=>{
            console.log(`Obtener recetas: ${recipes.type}`);
            if(recipes.type == 1 || recipes.type == -2){
              this.recetaService.recetas = recipes.message
              console.log(this.recetaService.recetas)

              for(let j=0;j<this.recetaService.recetas.length;j++){  // Crear campos en las recetas para 
                this.recetaService.recetas[j].ingredientes=[];      // array de ingredientes
                this.recetaService.recetas[j].dietas=[];      // array de dietas
                this.recetaService.recetas[j].microscore=[];      // array de microscores (ordenadas de mayor a menor)
              }
              this.micronutrientService.getMicrosRecetas()
              .subscribe((micros:any)=>{           //obtener microscore de cada receta
                console.log(`Obtener microscores: ${micros.type}`);
                for(let i=0; i<micros.message.length;i++){
                  for(let j=0;j<this.recetaService.recetas.length;j++){
                    if(this.recetaService.recetas[j].recipe_id==micros.message[i].recipe_id){
                      this.recetaService.recetas[j].microscore
                      .push({
                        micronutrient_id:micros.message[i].micronutrient_id,
                        micronutrient_name:micros.message[i].micronutrient_name,
                        acronym:micros.message[i].acronym,
                        color:micros.message[i].color,
                        percent:micros.message[i].percent,
                        group_id:micros.message[i].group_id
                      })
                    }
                  }
                } 
                this.recetaService.getRecetasDetails()       // Obtener ingredientes y dietas de cada receta
                .subscribe((detalles:any)=>{
                  console.log(`Obtener dietas e ingredientes: ${detalles.type}`);
                  for(let i=0; i<detalles.message.length;i++){
                    for(let j=0;j<this.recetaService.recetas.length;j++){
                      if(this.recetaService.recetas[j].recipe_id==detalles.message[i].recipe_id){  
                        if(!this.recetaService.recetas[j].ingredientes.some(function (ingrediente){
                          return ingrediente.ingredient_name==detalles.message[i].ingredient_name     
                        })){                                      //añadir ingredientes si no están en la lista de ingredientes
                          this.recetaService.recetas[j].ingredientes.push({
                            ingredient_id:detalles.message[i].ingredient_id,
                            ingredient_name:detalles.message[i].ingredient_name,
                            amount:detalles.message[i].amount,
                            unit:detalles.message[i].unit,
                            total_grams:detalles.message[i].total_grams})
                        }                                    //añadir dietas si no están en la lista de dietas
                        if(!this.recetaService.recetas[j].dietas.includes(detalles.message[i].diet_name)){
                          this.recetaService.recetas[j].dietas.push(detalles.message[i].diet_name)
                        } 
                      }
                    }
                  }
                  console.log(this.recetaService.recetas)
                  sessionStorage.setItem('recetas',JSON.stringify(this.recetaService.recetas))

                  this.recetaService.getRecetasParaTi(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString)
                  .subscribe((recetas:any)=>{        // Lista recetas para ti
                    console.log(`Obtener recetas para ti: ${recetas.type}`);
                    for(let i=0;i<this.recetaService.recetas.length;i++){
                      let allRecipes=this.recetaService.recetas[i]
                      if(recetas.message.some(function(receta){
                        return receta.recipe_id==allRecipes.recipe_id
                      })){
                        this.recetaService.recetasParaTi.push(this.recetaService.recetas[i])
                      } 
                    } console.log(this.recetaService.recetasParaTi)
                    sessionStorage.setItem('recetasParaTi',JSON.stringify(this.recetaService.recetasParaTi))
                    
                    this.progressService.getAverageProgress(JSON.parse(sessionStorage.getItem('userSession')).user_id)
                    .subscribe((average:any)=>{           //  media del progreso del user por fechas
                      console.log(`Obtener average progress: ${average.type}`);
                      if(average.type==1 || average.type== -1){
                        this.progressService.averageProgress=average.message
                        sessionStorage.setItem('averageProgress',JSON.stringify(this.progressService.averageProgress))
                        console.log(this.progressService.averageProgress)
                        this.progressService.getAverageProgressTotal()        
                        .subscribe((averageTotal:any)=>{          //media del progreso de todos los users por fechas
                          console.log(`Obtener average progress total: ${averageTotal.type}`);
                          if(averageTotal.type==1 || average.type== -1){
                            this.progressService.averageProgressTotal=averageTotal.message
                            sessionStorage.setItem('averageProgressTotal',JSON.stringify(this.progressService.averageProgressTotal))
                            console.log(this.progressService.averageProgressTotal)
                            console.log('dateString antes de get Progress: ' + this.dateString)
                            this.progressService.getProgress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString) 
                            .subscribe((progresoUser:any)=>{          //Obtiene el progreso para cada micronutriente del user hoy
                              console.log(`Obtener progreso: ${progresoUser.type}`);
                              console.log(progresoUser.message);
                              if(progresoUser.type==1){             //Rellena totalProgress con el array de jsons del progreso de cada micronutriente
                                this.progressService.totalProgress=new Progress(this.apiService.user.user_id,this.dateString,progresoUser.message)   
                                sessionStorage.setItem('totalProgress',JSON.stringify(this.progressService.totalProgress))
                                console.log(this.progressService.totalProgress);
                                this.micronutrientService.getGrupos()   
                                .subscribe((grupos:any)=>{           //Obtiene la media de progreso para cada grupo y rellena el atributo groups
                                  console.log(`Obtener grupos: ${grupos.type}`);
                                  console.log(grupos.message);
                                  if(grupos.type==1 || grupos.type==-1){
                                    this.micronutrientService.grupos=grupos.message;
                                    sessionStorage.setItem('groups',JSON.stringify(this.micronutrientService.grupos))
                                    ///  Y por fin entra
                                    this.router.navigate(['home']);
                                  }
                                  console.log(this.micronutrientService.grupos)
                                });
                              
                              }else if(progresoUser.type==-1){
                                  let progreso={user_id: JSON.parse(sessionStorage.getItem('userSession')).user_id,date: this.dateString,percent: 0}
                                  this.progressService.startProgress(progreso)  //inserta un nuevo registro de progreso para cada micronutriente en fecha hoy y percent=0
                                  .subscribe((added:any)=>{
                                    console.log(`start progress: ${added.type}`);
                                    console.log(added.message)
                                    this.progressService.getProgress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString) 
                                    .subscribe((progresoUser:any)=>{          //Obtiene el progreso para cada micronutriente del user hoy
                                      console.log(`Obtener progreso: ${progresoUser.type}`);
                                      this.progressService.totalProgress=new Progress(this.apiService.user.user_id,this.dateString,progresoUser.message)   
                                      sessionStorage.setItem('totalProgress',JSON.stringify(this.progressService.totalProgress))
                                      console.log(this.progressService.totalProgress);
                                      this.micronutrientService.getGrupos()   
                                      .subscribe((grupos:any)=>{           //Obtiene la media de progreso para cada grupo y rellena el atributo groups
                                        console.log(`Obtener grupos: ${grupos.type}`);
                                        console.log(grupos.message);
                                        if(grupos.type==1 || grupos.type==-1){
                                          this.micronutrientService.grupos=grupos.message;
                                          sessionStorage.setItem('groups',JSON.stringify(this.micronutrientService.grupos))
                                          ///  Y por fin entra
                                          this.router.navigate(['home']);
                                        }
                                        console.log(grupos.message)
                                      });
                                    })
                             
                                  })
                              }  
                            })
                          }
                        })
                      }
                    })   
                  })
                })
              })  
            }
          })
        }
      })
        
          


      }else if(data.type == -1){
        console.log(data.message);
        console.log('error');

// MANDAR MENSAJE DE USUARIO/PASSWORD INCORRECTOS


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
