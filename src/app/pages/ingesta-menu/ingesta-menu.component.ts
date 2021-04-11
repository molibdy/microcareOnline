import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingesta-menu',
  templateUrl: './ingesta-menu.component.html',
  styleUrls: ['./ingesta-menu.component.css']
})
export class IngestaMenuComponent implements OnInit {
  
  public introducirRecetaBooleano:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  switchIntReceta()
  {
    if(this.introducirRecetaBooleano)
    {
      this.introducirRecetaBooleano = false
    }
    else
    {
      this.introducirRecetaBooleano = true
    }

  }

}
