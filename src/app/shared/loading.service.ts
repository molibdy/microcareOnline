import { IngredientesService } from 'src/app/shared/ingredientes.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Progress } from '../models/progress';
import { LoginInfoService } from './login-info.service';
import { MicronutrientesService } from './micronutrientes.service';
import { ProgressService } from './progress.service';
import { RecetasService } from './recetas.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public date=new Date();
  public dateString=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`;
  public yesterday=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()-1}`;
  public isLogeando:boolean=false;

  public showNavBar:boolean=false;

  constructor(
    private apiService: LoginInfoService, 
    public IngredientesService: IngredientesService,
    public progressService:ProgressService, 
    public recetaService:RecetasService,
    public micronutrientService:MicronutrientesService,
    private router:Router,
    private activeRoute: ActivatedRoute,
  ) { 

    
   
  }





  public getRuta(){
    return this.activeRoute.snapshot.url
  }


  public loadAll(){
    this.apiService.user=JSON.parse(sessionStorage.getItem('userSession'))

    this.apiService.getPreferences(this.apiService.user.user_id)
    .subscribe((preferencias:any)=>{
      console.log(`Obtener preferencias: ${preferencias.type}`)
      if(preferencias.type==1){
        this.apiService.preferencias=preferencias.message
      }

      this.IngredientesService.getAlergenos()
      .subscribe((alergenos:any)=>{
        console.log(`Obtener alergenos: ${alergenos.type}`)
        if(alergenos.type==1){
          this.IngredientesService.alergenos = alergenos.message
        }
       
        this.IngredientesService.getDietas()
        .subscribe((dietas:any)=>{
          console.log(`Obtener dietas: ${dietas.type}`)
          if(dietas.type==1){
            this.IngredientesService.dietas = dietas.message
          }
          
          this.micronutrientService.getMicros()     //  Obtener array de micronutrientes
          .subscribe((micronutrients:any)=>{
            console.log(`Obtener micronutrientes: ${micronutrients.type}`);
            if(micronutrients.type == 1 || micronutrients.type == -2){
              this.micronutrientService.micronutrientes = micronutrients.message
              sessionStorage.setItem('micronutrientes',JSON.stringify(this.micronutrientService.micronutrientes))
              console.log(this.micronutrientService.micronutrientes)

              this.IngredientesService.getIngredientes()
              .subscribe((ingredientes:any)=>{
                console.log("obtener ingredientes" + ingredientes.type);
                
                this.IngredientesService.Ingredientes = ingredientes.message
                console.log(this.IngredientesService.Ingredientes);
                
                this.recetaService.getRecetas()   //  Obtener recetas                                  
                .subscribe((recipes:any)=>{
                  console.log(`Obtener recetas: ${recipes.type}`);
                  if(recipes.type == 1 || recipes.type == -2){
                    this.recetaService.recetas = recipes.message
                    console.log(this.recetaService.recetas)

                    for(let j=0;j<this.recetaService.recetas.length;j++){  // Crear campos en las recetas para: 
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

                      this.recetaService.getRecetasParaTi(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.yesterday)
                      .subscribe((recetas:any)=>{        // Lista recetas para ti
                        console.log(`Obtener recetas para ti: ${recetas.type}`);
                        this.recetaService.recetasParaTi = []
                        for(let i=0;i<this.recetaService.recetas.length;i++){
                          let allRecipes=this.recetaService.recetas[i]
                          if(recetas.message.some(function(receta){
                            return receta.recipe_id==allRecipes.recipe_id
                          })){
                            this.recetaService.recetasParaTi.push(this.recetaService.recetas[i])
                          } 
                        } console.log(this.recetaService.recetasParaTi)
                        
                        this.progressService.getAverageProgress(JSON.parse(sessionStorage.getItem('userSession')).user_id)
                        .subscribe((average:any)=>{           //  media del progreso del user por fechas
                          console.log(`Obtener average progress: ${average.type}`);
                          if(average.type==1){
                            this.progressService.averageProgress=average.userAverage
                            // sessionStorage.setItem('averageProgress',JSON.stringify(this.progressService.averageProgress))
                            console.log(this.progressService.averageProgress)
                            this.progressService.averageProgressTotal=average.totalAverage


                            this.micronutrientService.getGrupos()   
                            .subscribe((grupos:any)=>{           //Micronutrient_groups
                              console.log(`Obtener grupos: ${grupos.type}`);
                              console.log(grupos.message);
                              if(grupos.type==1 || grupos.type==-1){
                                this.micronutrientService.grupos=grupos.message;
                                sessionStorage.setItem('groups',JSON.stringify(this.micronutrientService.grupos))

                                this.progressService.getProgress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString) 
                                .subscribe((progresoUser:any)=>{          //Obtiene el progreso para cada micronutriente del user hoy
                                  console.log(`Obtener progreso: ${progresoUser.type}`);
                                  console.log(progresoUser.message);
                                  if(progresoUser.type==1){             //totalProgress: objeto Progress con microscore del user
                                    this.progressService.totalProgress=new Progress(JSON.parse(sessionStorage.getItem('userSession')).user_id,this.dateString,progresoUser.message)   
                                    sessionStorage.setItem('totalProgress',JSON.stringify(this.progressService.totalProgress))
                                    console.log(this.progressService.totalProgress);
                                    console.log(this.router.url)
                                    ///  Si está en login: ir a Home
                                    if(this.isLogeando){
                                      console.log('ir a home')
                                      this.router.navigate(['home']);
                                      this.showNavBar=true
                                      // setTimeout(()=>{
                                      //   this.showNavBar=true
                                      // },1000)
                                    }else{
                                      // this.router.navigate([this.router.url]);
                                        this.showNavBar=true
                                    }
                              
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
                                        // sessionStorage.setItem('totalProgress',JSON.stringify(this.progressService.totalProgress))
                                        console.log(this.progressService.totalProgress);
                    
                                            
                                        ///  Si está en login: ir a Home
                                        if(this.router.url=='/login' && this.isLogeando){
                                          console.log('ir a home')
                                          this.router.navigate(['home']);
                                          // setTimeout(()=>{
                                          //   this.showNavBar=true
                                          // },1000)
                                          this.showNavBar=true
                                        }
                                        else{
                                          // this.router.navigate([this.router.url]);
                                            this.showNavBar=true
                                        }
                                      });
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
              
              })
            }
          })    
        
        })
        
    
      })


         
  })


     
  }






}
