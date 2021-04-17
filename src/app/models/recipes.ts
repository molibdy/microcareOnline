
export class Recipes {

    public recipe_id:number
    public recipe_name:string
    public photo_url:string
    public recipe_instructions:string
    public recipe_serves:number
  

    constructor(recipe_id:number, recipe_name:string , photo_url:string, recipe_instructions:string, recipe_serves:number){
   
        this.recipe_id = recipe_id
        this.recipe_name = recipe_name
        this.photo_url =photo_url
        this.recipe_instructions = recipe_instructions
        this.recipe_serves = recipe_serves
    }
}