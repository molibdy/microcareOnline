
import { Component, OnInit } from '@angular/core';
import { LoginInfoService } from 'src/app/shared/login-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public LoginInfoService:LoginInfoService) { 
 
  }

  public entrar(){
    this.LoginInfoService.isDentro=true
  }
  

  ngOnInit(): void {
  }

}
