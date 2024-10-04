export interface User {
    photo?: string,
    username:string,
    password:string,
    email?:string,
    biography?:string,
    owner?:boolean
}