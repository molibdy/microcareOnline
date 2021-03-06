
import { MatIconRegistry } from '@angular/material/icon';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginInfoService } from './shared/login-info.service';
import { User } from './models/user';
import { LoadingService } from './shared/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {

  // public user:User;
  // public showNavBar:boolean=false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer : DomSanitizer,
    public LoginInfoService:LoginInfoService,
    public loadingService:LoadingService,
    private router:Router,
    private activeRoute: ActivatedRoute,

  ){

    
    // console.log(this.router.url)
    // if(this.router.url=='/login' || this.router.url=='/register'){
    //   this.loadingService.showNavBar=false
    // }else{
    //   this.loadingService.showNavBar=true
    // }

    if(JSON.parse(sessionStorage.getItem('userSession'))!=null){
      console.log(JSON.parse(sessionStorage.getItem('userSession')).user_id)
      this.LoginInfoService.user=JSON.parse(sessionStorage.getItem('userSession'));
      this.loadingService.loadAll()
    }else{
      this.router.navigate(['login']);
    }



    
    
/*    //////////////////// CREAR ICONOS //////////////////////// */

    // this.matIconRegistry.addSvgIcon("grafica",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/spreadsheet-app.svg"));
    this.matIconRegistry.addSvgIcon("grafica",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/graph.svg"));
    this.matIconRegistry.addSvgIcon("boton-anadir",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/boton-Anadir-Ingesta.svg"));
    this.matIconRegistry.addSvgIcon("calendario",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/calendar.svg"));
    this.matIconRegistry.addSvgIcon("search",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/buscar.svg"));
    this.matIconRegistry.addSvgIcon("recipes",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/chef.svg"));
    this.matIconRegistry.addSvgIcon("settings",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/settings.svg"));
    this.matIconRegistry.addSvgIcon("reto",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/retos.svg"));
    this.matIconRegistry.addSvgIcon("logo",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/logo.svg"));
    this.matIconRegistry.addSvgIcon("left-arrow",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/left-arrow.svg"));
    this.matIconRegistry.addSvgIcon("right-arrow",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/right-arrow (1).svg"));
    this.matIconRegistry.addSvgIcon("arrow-expansion",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/arrowExpansion.svg"));
    this.matIconRegistry.addSvgIcon("close",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/close.svg"));
    this.matIconRegistry.addSvgIcon("add",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/add.svg"));
    this.matIconRegistry.addSvgIcon("serves",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/restaurant.svg"));
    this.matIconRegistry.addSvgIcon("apuntando-hacia-abajo",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/apuntando-hacia-abajo.svg"));

    this.matIconRegistry.addSvgIcon("search",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/vidrio-de-aumento.svg"));
    this.matIconRegistry.addSvgIcon("close",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/close.svg"));
    this.matIconRegistry.addSvgIcon("configuracion",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/configuraciones.svg"));
    this.matIconRegistry.addSvgIcon("burger",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/menu.svg"));
    this.matIconRegistry.addSvgIcon("flecha-desplegable",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/right-arrow.svg"));

    this.matIconRegistry.addSvgIcon("isa",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/team/isa.svg"));
    this.matIconRegistry.addSvgIcon("fran",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/team/fran.svg"));
    this.matIconRegistry.addSvgIcon("rodri",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/team/rodri.svg"));
    this.matIconRegistry.addSvgIcon("linkedinFran",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/team/linkedinFran.svg"));
    this.matIconRegistry.addSvgIcon("linkedinIsa",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/team/linkedinIsa.svg"));
    this.matIconRegistry.addSvgIcon("linkedinRodri",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/team/linkedinRodri.svg"));
    this.matIconRegistry.addSvgIcon("linkedin",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/team/linkedin.svg"));
    this.matIconRegistry.addSvgIcon("historia",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/team/man.svg"));

    this.matIconRegistry.addSvgIcon("navbar",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/app/navbar.svg"));
    this.matIconRegistry.addSvgIcon("progreso",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/app/progreso.svg"));
    this.matIconRegistry.addSvgIcon("receta",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/app/receta.svg"));


    this.matIconRegistry.addSvgIcon("front",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/herramientasUsadas/front.svg"));
    this.matIconRegistry.addSvgIcon("back",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/herramientasUsadas/back.svg"));
    this.matIconRegistry.addSvgIcon("futurasImplementaciones",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/herramientasUsadas/futurasImplementaciones.svg"));



    


    this.matIconRegistry.addSvgIcon("apio",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/alergenos2/celery.svg"));
    this.matIconRegistry.addSvgIcon("cacahuetes",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/alergenos2/peanut.svg"));
    this.matIconRegistry.addSvgIcon("crustaceo",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/alergenos2/lobster.svg"));
    this.matIconRegistry.addSvgIcon("frutosSecos",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/alergenos2/pistacho.svg"));
    this.matIconRegistry.addSvgIcon("gluten",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/alergenos2/gluten.svg"));
    this.matIconRegistry.addSvgIcon("huevo",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/alergenos2/egg.svg"));
    this.matIconRegistry.addSvgIcon("leche",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/alergenos2/milk-bottle.svg"));
    this.matIconRegistry.addSvgIcon("moluscos",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/alergenos2/mejillon.svg"));
    this.matIconRegistry.addSvgIcon("mostaza",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/alergenos2/mustard.svg"));
    this.matIconRegistry.addSvgIcon("pescado",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/alergenos2/fish.svg"));
    this.matIconRegistry.addSvgIcon("sesamo",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/alergenos2/sesame.svg"));
    this.matIconRegistry.addSvgIcon("sulfitos",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/alergenos2/sulfito.svg"));
    this.matIconRegistry.addSvgIcon("altramuces",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/alergenos2/lupin.svg"));
    this.matIconRegistry.addSvgIcon("enter",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/Asset2.svg"));


    
  }
  
  title = 'microcareApp';
}
