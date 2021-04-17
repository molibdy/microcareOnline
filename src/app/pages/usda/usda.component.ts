import { Component, OnInit } from '@angular/core';
import { UsdaService } from 'src/app/shared/usda.service';

@Component({
  selector: 'app-usda',
  templateUrl: './usda.component.html',
  styleUrls: ['./usda.component.css']
})
export class UsdaComponent implements OnInit {
public inputSearch:string;
public ingredient_id: number;
  constructor(private usdaService:UsdaService) { 
    this.inputSearch=''
    this.ingredient_id=0
  }



  searchIngredient(){
    console.log('buscando')
    this.usdaService.getIngredient(Number(this.inputSearch)).subscribe((ingredient:any)=>{
      console.log('got ingredients from usda')
      let body={ingredient_id:this.ingredient_id, grams:100, micronutrients: ingredient.foodNutrients}
      this.usdaService.postMicronutrients(body).subscribe((insertion:any)=>{
        console.log(insertion)
      })
   
    })
  }
  ngOnInit(): void {
  }

}
