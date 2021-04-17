import { Ingredient } from "./ingredient";


export class Recipe {
    public recipe_id:number;
    public recipe_name:string;
    public instructions:string;
    public photo_url:string;
    public serves:number;
    public ingredients:Ingredient[];
    public microscore:any[];
}
