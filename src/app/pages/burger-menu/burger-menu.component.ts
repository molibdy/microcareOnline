import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { User } from 'src/app/models/user';
import { LoadingService } from 'src/app/shared/loading.service';
import { LoginInfoService } from 'src/app/shared/login-info.service';
import { MicronutrientesService } from 'src/app/shared/micronutrientes.service';

import { RecetasService } from 'src/app/shared/recetas.service';



@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.css']
})
export class BurgerMenuComponent implements OnInit {
  public inputText:string = ""
  public foco:boolean = false
  public focoBuscador:boolean = false
  public coincidencia:string[] = ['','Hey como estas',"adios amigo","sss","dd"]
  public imageProfile:string = 'https://media-exp1.licdn.com/dms/image/C5603AQHgQm5806sx2A/profile-displayphoto-shrink_200_200/0/1541434175803?e=1621468800&v=beta&t=MOKmnJRHHZuVXWS2uTrRQvfKVEl3nVDhvMssTmYw79o'


  constructor(private apiService:MicronutrientesService, 
    private servicioReceta:RecetasService,
    private loadingService:LoadingService,
    private userService:LoginInfoService,
    private router:Router) 
  {}

   
  activaNavBar(ruta:string){
    this.loadingService.showNavBar=true;
    this.router.navigate([ruta])
  }


  logOut(){
    sessionStorage.clear();
    // this.userService.user=new User(0,'','')
    this.loadingService.isLogeando=false
    this.router.navigate(['/login'])
  }


  ngOnInit(): void {
  
 
  }  

}


