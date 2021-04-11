import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BurgerMenuComponent } from './pages/burger-menu/burger-menu.component';
import { BuscadorRecetasComponent } from './pages/buscador-recetas/buscador-recetas.component';
import { BarraBuscadorComponent } from './pages/buscador/barra-buscador/barra-buscador.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { FichaGrupoComponent } from './pages/ficha-grupo/ficha-grupo.component';
import { FichaMicroComponent } from './pages/ficha-micro/ficha-micro.component';
import { HomeComponent } from './pages/home/home.component';
import { IngestaMenuComponent } from './pages/ingesta-menu/ingesta-menu.component';
import { IntroducirManualComponent } from './pages/ingestaComponentes/introducir-manual/introducir-manual.component';
import { IntroComponent } from './pages/intro/intro.component';
import { Intro1Component } from './pages/intro1/intro1.component';
import { Intro2Component } from './pages/intro2/intro2.component';
import { Intro3Component } from './pages/intro3/intro3.component';
import { Intro4Component } from './pages/intro4/intro4.component';
import { LoginComponent } from './pages/login/login.component';
import { PreferenciasComponent } from './pages/preferencias/preferencias.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { VistaRecetaComponent } from './pages/vista-receta/vista-receta.component';

BarraBuscadorComponent

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'dia', component:CalendarioComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'menu', component:BurgerMenuComponent},
  {path:'home/grupo', component:FichaGrupoComponent},
  {path:'buscar-receta', component:BuscadorRecetasComponent},
  {path:'home/configuracion', component:ConfiguracionComponent},
  {path:'home/grupo/micro',component:FichaMicroComponent},
  {path:'usuario', component:UsuarioComponent},
  {path:'manual', component:IntroducirManualComponent},
  {path:'anadir', component:IngestaMenuComponent},
  {path:'calendario', component:CalendarioComponent},
  {path:'home', component:HomeComponent},
  {path:'buscar-receta/receta', component:VistaRecetaComponent},
  {path:'anadir', component:IngestaMenuComponent},
  {path:'seleccionarRecetas',component:BarraBuscadorComponent},
  {path:'menu/configuracion', component:ConfiguracionComponent},
  {path:'intro', component:IntroComponent},
  {path:'intro1', component:Intro1Component},
  {path:'intro2', component:Intro2Component},
  {path:'intro3', component:Intro3Component},
  {path:'intro4', component:Intro4Component},
  {path:'menu/preferencias', component:PreferenciasComponent},
 

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
