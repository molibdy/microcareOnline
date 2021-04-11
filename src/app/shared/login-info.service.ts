import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginInfoService {
  public isDentro:boolean
  constructor() { 
    this.isDentro=false
  }
}
