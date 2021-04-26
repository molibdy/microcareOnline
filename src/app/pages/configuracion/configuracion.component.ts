import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginInfoService } from 'src/app/shared/login-info.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  
  public user:User
  public newName:string=null;
  public newEmail:string=null;
  public newPassword:string=null;
  public newPhoto:string=null;
  public savedChanges:boolean=false;
  public showChangePic:boolean=false;
  constructor(
    public userService:LoginInfoService,
    private router:Router
  ) { 
    this.user=JSON.parse(sessionStorage.getItem('userSession'))
    console.log(this.user)
  }


  cambiarFoto(){
    if(this.showChangePic){
      this.showChangePic=false
    }else{
      this.showChangePic=true
    }
  }
  

  guardarCambios(){
    let configuracion={user_id:JSON.parse(sessionStorage.getItem('userSession')).user_id, username:this.newName, email:this.newEmail, password:this.newPassword, profile_picture:this.newPhoto}
    console.log(configuracion)
    this.userService.putUsuario(configuracion).subscribe((modified:any)=>{
      if(modified.type==1){
        this.newName=null;
        this.newEmail=null;
        this.newPassword=null;
        this.newPhoto=null;
        this.savedChanges=true
        this.showChangePic=false
        this.userService.getUsuarioChanged(JSON.parse(sessionStorage.getItem('userSession')).user_id).subscribe((newUserData:any)=>{
          if(newUserData.type==1){
            this.userService.user=newUserData.message[0]
            sessionStorage.setItem('userSession',JSON.stringify(this.userService.user))
            this.user=this.userService.user
            console.log(this.user)
            this.router.navigate(['/home'])
          }
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
