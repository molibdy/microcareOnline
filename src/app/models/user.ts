

export class User {

    public user_id :number;
    public username :string ;
    public password :string ;
    public email: string ;
    public profile_picture: string;

    constructor(user_id:number, username:string, password:string, email:string){
        this.user_id=user_id
        this.username = username
        this.password = password
        this.email = email

    }

}