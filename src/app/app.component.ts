import { MatIconRegistry } from '@angular/material/icon';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginInfoService } from './shared/login-info.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {


  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer : DomSanitizer,
    public LoginInfoService:LoginInfoService
  )
  {
/*    //////////////////// CREAR ICONOS //////////////////////// */

    this.matIconRegistry.addSvgIcon("grafica",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/spreadsheet-app.svg"));
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

    this.matIconRegistry.addSvgIcon("search",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/vidrio-de-aumento.svg"));
    this.matIconRegistry.addSvgIcon("close",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/close.svg"));
    this.matIconRegistry.addSvgIcon("configuracion",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/configuraciones.svg"));
    this.matIconRegistry.addSvgIcon("burger",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/hamburguesa.svg"));
    this.matIconRegistry.addSvgIcon("flecha-desplegable",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/right-arrow.svg"));

    


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
