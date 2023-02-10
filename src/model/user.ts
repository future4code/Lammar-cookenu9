export type User = {
    id : string,
    email : string,
    name : string,
    password : string
}

export type AuthenticationData = {
    id: string
}

export interface UserInputDTO {
    email: string,
    name: string,
    password: string,
}

export interface LoginInputDTO {
    email: string,
    password: string,
}