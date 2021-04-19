import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginInfoService } from 'src/app/shared/login-info.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public user:User
  public imageProfile:string = 'https://media-exp1.licdn.com/dms/image/C5603AQHgQm5806sx2A/profile-displayphoto-shrink_200_200/0/1541434175803?e=1621468800&v=beta&t=MOKmnJRHHZuVXWS2uTrRQvfKVEl3nVDhvMssTmYw79o'
  constructor(
    public userService:LoginInfoService
  ) {
    this.user=this.userService.user
   }

  ngOnInit(): void {
  }

}
