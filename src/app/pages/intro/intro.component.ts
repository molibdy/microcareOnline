import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  public posicion:number = 0;
  public class:string = "";
  public imgIntro:string ="";
  public texto:string = ""

  constructor() { }

  ngOnInit(): void {
  }
  toPrevius()
  {
    this.posicion--
    if(this.posicion>0)
    switch (this.posicion) {
      case 0:
        this.class = "";
        break;
        case 1:
        this.class = "uno";
        this.texto = "fdsfas";
        this.imgIntro = "https://www.flaticon.com/svg/vstatic/svg/3274/3274038.svg?token=exp=1617806732~hmac=46321abd73823e3632db7ff6e9910ec3";
        
        break;
        case 2:
        this.class = "dos";
        this.texto = "fdsfsfs";
        this.imgIntro = "";
        break;
        case 3:
        this.class = "tres";
        this.texto = "fdsfsf";
        this.imgIntro = "";
        break;
        case 4:
        this.class = "cuatro";
        this.texto = "dasdad";
        this.imgIntro = "";
        break;
    }
    else
    {
      this.posicion = 0  
      this.class=""
     
    }
    
    

  }
  toNext()
  {
    this.posicion++
    if(this.posicion<=4)
    switch (this.posicion) {
      case 0:
        this.class = "";
        break;
        case 1:
        this.class = "uno";
        this.texto = "";
        this.imgIntro = "https://www.flaticon.es/svg/vstatic/svg/3335/3335973.svg?token=exp=1617808120~hmac=7f05ca07be0c212be7ef342de8468fd6";
        
        break;
        case 2:
        this.class = "dos";
        this.texto = "";
        this.imgIntro = "";
        break;
        case 3:
        this.class = "tres";
        this.texto = "";
        this.imgIntro = "";
        break;
        case 4:
        this.class = "cuatro";
        this.texto = "";
        this.imgIntro = "";
        break;
    }
    else
    {
      this.class=""
      this.posicion = 0
    }
    console.log(this.imgIntro);

  }

}
