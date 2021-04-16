export class Progress {

    public user_id:number;
    public date:string;
    public percents:any[]
    // public micronutrient_id:number;
    // public percent:number;
    constructor(user_id:number,date:string,percents:any[]){
        this.user_id=user_id;
        this.date=date;
        this.percents=percents
        // this.micronutrient_id=micronutrient_id;
        // this.percent=percent
    }
}

