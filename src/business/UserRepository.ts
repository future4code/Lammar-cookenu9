import { LoginInputDTO, User } from "../model/user";

export interface UserRepository {
    signup(user:User):Promise<void>
    findUserByEmail(email:String):Promise<void>
}