import {Request, Response} from "express";
import { FollowRequest, FollowUserDTO, UnfollowUserDTO } from "../model/follow";
import { FollowBusiness } from "../business/FollowBusiness";


export class FollowController {

    constructor(private followBusiness : FollowBusiness) {}

    public followUser = async (req: Request, res: Response) => {
        try {
            
            const token = req.headers.authorization as string
            const {userToFollowId} = req.body;

            const input: FollowUserDTO = {
                token,
                userToFollowId
            }

            await this.followBusiness.followUser(input)

            res.status(201).send({ message: "Usuário seguido com sucesso"})
        }
        catch (error:any) {
            res.status(400).send(error.message)
        }
    }

    public unfollowUser = async (req:Request, res: Response) => {
        try {
            
            const token = req.headers.authorization as string
            const {userToUnfollowId} = req.body;

            const input: UnfollowUserDTO = {
                token,
                userToUnfollowId
            }

            await this.followBusiness.unfollowUser(input)

            res.status(200).send({ message: "Unfollowed com sucesso"})

        }
        catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}