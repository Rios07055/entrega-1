export interface User {
    user_id?:number,
    photo?: string,
    username:string,
    password:string,
    email?:string,
    biography?:string,
    owner?:boolean,
    token?:string
}