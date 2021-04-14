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


  registrarUsuario(){
    console.log(this.myForm.value.username);
    this.apiService.getUsuario(this.myForm.value.username).subscribe((data:any)=>
    {
      console.log(data)
      if(data.type == 1){
        this.apiService.postUsuario(data.message).subscribe((data2:any)=>
        {
          if(data2.affectedrows=0){
            this.respuestaNegativa = data2.message  + "El usuario ya existe"
          }else{
            console.log(data2);
            this.respuestaPositiva = data2.message  + "La cuenta ha sido creada"
          }
      })
    }else if(data.type == -1 || data.type == -2){
      this.respuestaNegativa = data.message  + "El usuario ya existe"
    }else{
      this.respuestaNegativa = data.message
    }
  })
}}
