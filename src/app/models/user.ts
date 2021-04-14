

export class User {

    public user_id :number = 0;
    public username :string = "";
    public password :string = "";
    public email: string = "";
    public profile_picture: string="";

    constructor( username:string, password:string, email:string)
    {
    this.username = username
    this.password = password
    this.email = email

    }

}