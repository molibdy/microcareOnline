import { Ingredient } from "./ingredient";
import { Microscore } from "./microscore";

export class Recipes {

    public recipe_id:number
    public recipe_name:string
    public photo_url:string
    public instructions:string
    public serves:number;
    public ingredientes:Ingredient[];
    public dietas:string[];
    public microscore:Microscore[]
    public alergenos:string[]
  

}