
import { Component, OnInit } from '@angular/core';
import { LoginInfoService } from 'src/app/shared/login-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

public loginForm: FormGroup
public isNonRegisteredC:boolean = false
  router: any;

  constructor(private formBuilder: FormBuilder, private apiService: LoginInfoService) { 
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
    
      if(data.type == 1){
        console.log(data.message)
        this.apiService.user = new User(data.message[0].user_id, data.message[0].username, data.message[0].password)
        this.apiService.user.email = data.message[0].email
        sessionStorage.setItem('userSession',JSON.stringify(this.apiService.user))
        console.log(data.message)
        this.router.navigate(['home']);
      }else if(data.type == -1){
        console.log(data.message[0]);
        console.log('error');
        
          this.isNonRegisteredC = true 
      }
      
    })
  
    

  }


}
