
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginInfoService } from 'src/app/shared/login-info.service';
import { ProgressService } from 'src/app/shared/progress.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

public loginForm: FormGroup
public date=new Date()
public dateString=`${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`
  constructor(private formBuilder: FormBuilder, private apiService: LoginInfoService, public progressService:ProgressService) { 
 this.buildForm()
 
  }
  ngOnInit(): void {
  
  }

  public entrar(){
    this.apiService.isDentro=true
  }

 
  buildForm(){
    this.loginForm = this.formBuilder.group({
      username: [],
      password: [],
    })

  }

  logearse(){
    this.apiService.datosLogin(this.loginForm.value.username,this.loginForm.value.password)

    // Lo siguiente sólo debería ocurrir cuando el user está rellenado con los datos de obtenerUsuario()
    
      //1.
      this.progressService.startAll(this.apiService.user.user_id,this.dateString)

      //2. Routing a home desde controlador
  }


}
