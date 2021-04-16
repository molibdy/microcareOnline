export class Favourites {

    public favourite_id :number;
    public name :string ;
    public color: string;
    // public score: Micronutrient []

    constructor(favourite_id:number, name:string, color:string){
        this.favourite_id= favourite_id
        this.name = name
        this.color=color
    }

}