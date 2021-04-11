import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public myForm: FormGroup
  constructor(private formBuilder: FormBuilder) { 
    this.buildForm()
  }
 

  ngOnInit(): void {
  }

  private buildForm(){

    const minPasswordLength = 8
    
    this.myForm = this.formBuilder.group({
      usuario: [ Validators.required, Validators.minLength(minPasswordLength)],
      password: [Validators.required, Validators.minLength(minPasswordLength)],
      email : [Validators.required, Validators.email]
    })

  }



}
