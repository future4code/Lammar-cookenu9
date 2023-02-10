import { InvalidPassword, UserNotFound } from "../error/CustomError";
import { LoginInputDTO, User, UserInputDTO } from "../model/user";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { UserRepository } from "./UserRepository";


const idGenerator = new IdGenerator()
const authenticator = new Authenticator()

export class UserBusiness {

    constructor (private userDatabase: UserRepository) {}

    public signup = async (input: UserInputDTO) => {
        try{
            const {name, email, password} = input;

            const id: string = idGenerator.generateId();

            const user: User = {
                id: id,
                name: name,
                email: email,
                password: password
            }

            await this.userDatabase.signup(user)
            
            const token = authenticator.generateToken({id})

            return token
        }
        catch (error:any){
            console.log(error)
        }
    }

    public login = async (input: LoginInputDTO) => {
        try{
            const {email, password} = input;

            

            const user = await this.userDatabase.findUserByEmail(email)
            
            if(!user){
                throw new UserNotFound()
            }

            if(user.password !== password){
                throw new InvalidPassword()
            }


            const token = authenticator.generateToken({id: user.id})

            return token
        }
        catch (error:any){
            console.log(error)
        }


}