
import { Component, OnInit } from '@angular/core';
import { LoginInfoService } from 'src/app/shared/login-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

import { ProgressService } from 'src/app/shared/progress.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

public loginForm: FormGroup
public isNonRegisteredC:boolean = false
 public  router: Router;

public date=new Date()
public dateString=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`
  constructor(private formBuilder: FormBuilder, private apiService: LoginInfoService, public progressService:ProgressService, private _router:Router) { 
    this.router = _router

 this.buildForm()
 
  }
  ngOnInit(): void {
    if(this.isNonRegisteredC != false){
      this.isNonRegisteredC = true
    
     
    
      }
    }
  
  

  public entrar(){
    this.apiService.isDentro=true
  }

 
  buildForm(){
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required, Validators.minLength(4)],
      password: ["", Validators.required, Validators.minLength(4)],
    })

  }

  logearse(){
    this.apiService.user.username = this.loginForm.value.username
    this.apiService.user.password = this.loginForm.value.password

    this.apiService.obtenerUsuario(this.apiService.user).subscribe((data:any)=>
    { console.log("primer filtro");
      console.log('aqui');
      
      
      if(data.type == 1){
        console.log('hey')
        this.apiService.user = new User(data.message[0].user_id, data.message[0].username, data.message[0].password,data.message[0].email)
        sessionStorage.setItem('userSession',JSON.stringify(this.apiService.user))
        
        
        console.log(data.message)
        this.router.navigate(['home']);
      }else if(data.type == -1){
        console.log(data.message);
        console.log('error');
        sessionStorage.setItem('userSession',JSON.stringify(this.apiService.user))
        console.log(sessionStorage.getItem('userSession'));
        this.router.navigate(['home']);


        
          this.isNonRegisteredC = true 
      }
      
    })
  
    


    // Lo siguiente sólo debería ocurrir cuando el user está rellenado con los datos de obtenerUsuario()
    
      //1.
      this.progressService.startAll(this.apiService.user.user_id,this.dateString)

      //2. Routing a home desde controlador
  }


}
