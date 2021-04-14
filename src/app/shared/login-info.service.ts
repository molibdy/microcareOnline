import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginInfoService {
  public isDentro:boolean
  public user={user_id:1,username:'pepe'}
  constructor() { 
    this.isDentro=false
  }
}
