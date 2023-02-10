import {Request, Response} from "express";
import { LoginInputDTO, UserInputDTO } from "../model/user";
import { UserBusiness } from "../business/UserBusiness";


export class UserController {

    constructor(private userBusiness : UserBusiness) {}

    public signup = async (req: Request, res: Response) => {
        try {
            const {name, email, password} = req.body;

            const input: UserInputDTO = {
                name,
                email,
                password
            }

            const token = await this.userBusiness.signup(input)

            res.status(201).send({ message: "Usuário criado com sucesso", token})
        }
        catch (error:any) {
            res.status(400).send(error.message)
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body;
            
            const input: LoginInputDTO = {
                email,
                password
            }

            const token = await this.userBusiness.login(input);
            
            res.status(200).send({token})
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }
}