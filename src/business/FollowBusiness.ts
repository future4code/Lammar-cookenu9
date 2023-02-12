import { CustomError, InvalidUnfollowRequest } from "../error/CustomError";
import { FollowRequest, FollowUserDTO, unfollowRequest, UnfollowUserDTO } from "../model/follow";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { FollowRepository } from "./FollowRepository";

const idGenerator = new IdGenerator()
const authenticator = new Authenticator()

export class FollowBusiness {

    constructor (private followDatabase: FollowRepository) {}

    public followUser = async (input: FollowUserDTO) => {
        try{
            
            const {token, userToFollowId} = input;
            const follower = authenticator.verifyToken(token).id


            const id: string = idGenerator.generateId();

            const followRequest: FollowRequest  = {
                id: id,
                follower: follower,
                userToFollowId: userToFollowId
            }

            await this.followDatabase.followUser(followRequest)
        }
        catch (error:any){
            throw new Error(error.message)
        }
    }

    public unfollowUser = async (input: UnfollowUserDTO) => {

        try{
            
            const {token, userToUnfollowId} = input;
            const follower = authenticator.verifyToken(token).id

            const unfollowRequest: unfollowRequest = {
                follower: follower,
                userToUnfollowId: userToUnfollowId
            }

            const followList = await this.followDatabase.getFollowList(follower)

            console.log(followList)
            if(followList.includes(unfollowRequest.userToUnfollowId)){
                await this.followDatabase.unfollowUser(unfollowRequest)
            } else {
                throw new InvalidUnfollowRequest()
            }
        }
        catch (error:any){
            throw new CustomError(error.statuscode, error.message)
        }
    }


}