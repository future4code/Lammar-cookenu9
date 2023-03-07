import {Request, Response} from "express";
import { GetUserDTO, LoginInputDTO, UserInputDTO } from "../model/user";
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

    public getProfile = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const profile = await this.userBusiness.getProfile(token);
            res.status(200).send(profile)
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }

    public getUser = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const userId = req.params.id
            const getUserInput: GetUserDTO = {
                token : token,
                userId : userId
            }
            const userInfo = await this.userBusiness.getUser(getUserInput);
            res.status(200).send(userInfo)
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }

}