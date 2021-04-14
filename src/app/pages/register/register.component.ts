import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LoginInfoService } from 'src/app/shared/login-info.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public myForm: FormGroup

  public respuestaPositiva:string
  public respuestaNegativa:string
  
  constructor(private formBuilder: FormBuilder, private apiService: LoginInfoService) { 
    this.buildForm()
    this.respuestaPositiva = ""
    this.respuestaNegativa =""
  }
 

  ngOnInit(): void {
  }

buildForm(){
  this.myForm = this.formBuilder.group({
    username: [],
    password: [],
    email : []
  })
}


  //   const minPasswordLength = 8
    
  //   this.myForm = this.formBuilder.group({
  //     usuario: [ Validators.required, Validators.minLength(minPasswordLength)],
  //     password: [Validators.required, Validators.minLength(minPasswordLength)],
  //     email : [Validators.required, Validators.email]
  //   })

  // }


  registrarUsuario(form:FormGroup){
    this.apiService.getUsuario(form.value.username, form.value.email).subscribe((data:any)=>
    {
      console.log(data)
      if(data.type == -1 || data.type == -2){
        this.respuestaNegativa = "El usuario o el e-mail ya existen"
      }else{
        this.apiService.postUsuario(data).subscribe((data:any)=>
        {
          if(data.affectedrows=0){
            this.respuestaNegativa = "El usuario o el e-mail ya existen"
          }else{
            console.log(data);
            this.respuestaPositiva = "La cuenta ha sido creada"
          }
      })
    }
  })
}}
