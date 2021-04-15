export class Progress {

    public user_id:number;
    public date:string;
    public micronutrient_id:number;
    public percent:number;
    constructor(user_id:number,date:string,micronutrient_id:number,percent:number){
        this.user_id=user_id;
        this.date=date;
        this.micronutrient_id=micronutrient_id;
        this.percent=percent
    }
}

