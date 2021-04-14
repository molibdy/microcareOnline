
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginInfoService } from 'src/app/shared/login-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

public loginForm: FormGroup
  constructor(private formBuilder: FormBuilder, private apiService: LoginInfoService) { 
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


// logearse(){
 
// }


}
}
