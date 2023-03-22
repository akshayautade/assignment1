export interface AuthResponse{
    token:string,
    email:string,
    password:string,
    expiresIn:string,
    isError?:boolean
    error?:string
}