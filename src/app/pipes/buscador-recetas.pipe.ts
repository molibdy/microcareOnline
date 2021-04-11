import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class BuscadorRecetasPipe implements PipeTransform {

  public receta1 : object ={preferencia1:"Vegano", preferencia2:"Vegetariano" , chip1: "Ma", chip2 :"Le", foto:"https://www.pequeocio.com/wp-content/uploads/elementor/thumbs/arroz-con-pollo-1-omev5dh7vnjdtchady0s9ynyb9lk18efx8mhc5dp3g.jpg", nombre: "Arroz con pollo"}
  public receta2 : object ={preferencia1:"Vegano", preferencia2:"Vegetariano" , chip1: "Po", chip2 :"Ma", foto:"https://1.bp.blogspot.com/-Wu9mvQH5yyI/XpGghtnH-iI/AAAAAAACi3I/KrzMGpdIvZo1vDMmoHAqU7GvSqQuJymSwCNcBGAsYHQ/s1600/paella%2Bde%2Bmarisco%2B%25281%2529.JPG",nombre: "Paella Valenciana"}
  public receta3 : object ={preferencia1:"Vegano", preferencia2:"Vegetariano" , chip1: "Hi", chip2 :"So", foto:"https://carneentucasa.com/archivos/Noticias/983.jpg",nombre: "Cocido Madrileño"}
  public receta4 : object ={preferencia1:"Vegano", preferencia2:"Vegetariano" , chip1: "Co", chip2 :"Cl", foto:"https://www.laespanolaaceites.com/wp-content/uploads/2019/06/albondigas-en-salsa.jpg",nombre: "Albóndigas en su salsa"}
  public receta5 : object ={preferencia1:"Vegano", preferencia2:"Vegetariano" , chip1: "Mo", chip2 :"Se", foto:"https://cdn.queapetito.com/wp-content/uploads/2020/02/salmon-al-horno-con-salsa-de-soja-1200-amp.jpg",nombre: "Salmón al horno"}
  public receta6 : object ={preferencia1:"Vegano", preferencia2:"Vegetariano" , chip1: "Az", chip2 :"Co", foto:"https://placeralplato.com/files/2016/04/Espaguetis-a-la-carbonara-640x480.jpg?width=1200&enable=upscale",nombre: "Pasta carbonara"}
 

  public todas : object[] = [this.receta1, this.receta2,this.receta3,this.receta4, this.receta5, this.receta6]

  transform(ninjas:any, term:any): any {

    if (term === undefined) return ninjas
    return ninjas.filter(function(x){
      return x.name.toLowerCase().includes(term.toLowerCase())
    })
  }
}
