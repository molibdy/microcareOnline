
export class Micronutrients {

    public micronutrient_id:number
    public micronutrient_name:string
    public group:string
    public acronym:string
  

    constructor( micronutrient_id:number, micronutrient_name:string , group:string, acronym:string){
   
        this.micronutrient_id = micronutrient_id,
        this.micronutrient_name = micronutrient_name,
        this.group =group,
        this.acronym = acronym
      
    }
}