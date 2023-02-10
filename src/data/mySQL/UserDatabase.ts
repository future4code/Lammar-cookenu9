import { UserRepository } from "../../business/UserRepository";
import { User } from "../../model/user";
import { BaseDatabase } from "./BaseDatabase";



export class UserDatabase extends BaseDatabase implements UserRepository {
    private userTable = 'cookenu_users'
    
    public signup = async (user: User): Promise<void> => {
        try {
            UserDatabase.connection.initialize()
            await UserDatabase.connection.insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }).into(this.userTable)
        }
        catch (error:any) {
            console.log(error.message)
            throw new Error(error.message)
        }
    }

    public findUserByEmail = async (email: string): Promise<void> => {
        try {
            UserDatabase.connection.initialize()
            const result = await UserDatabase.connection(this.userTable)
            .where('email', email)
            return result[0]
        }
        catch (error:any) {
            console.log(error.message)
            throw new Error(error.message)
        }
    }
}