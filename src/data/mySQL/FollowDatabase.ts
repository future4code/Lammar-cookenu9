import { FollowRepository } from "../../business/FollowRepository"
import { FollowRequest, unfollowRequest } from "../../model/follow"
import { BaseDatabase } from "./BaseDatabase"

export class FollowDatabase extends BaseDatabase implements FollowRepository {
    private followTable = 'cookenu_follows'
    
    public followUser = async (followRequest: FollowRequest): Promise<void> => {
        try {
        
            FollowDatabase.connection.initialize()
            console.log(followRequest.userToFollowId)
            await FollowDatabase.connection.insert({
                id: followRequest.id,
                fk_follower: followRequest.follower,
                fk_userToFollow: followRequest.userToFollowId
            }).into(this.followTable)
        }
        catch (error:any) {
            console.log(error.message)
            throw new Error(error.message)
        }
    }

    public getFollowList = async (id: string): Promise<string[]> => {
        try {
                        
            FollowDatabase.connection.initialize()
            const followList:any = await FollowDatabase.connection(this.followTable)
            .select('fk_userToFollow as following' )
            .where('fk_follower', id)

            const queryResult = followList.map(
                (id:any) => id.following
            )

            return(queryResult)
        }
        catch (error:any) {
            console.log(error.message)
            throw new Error(error.message)
        }
    }

    public unfollowUser = async (unfollowRequest:unfollowRequest): Promise<void> => {
        try{
            const {follower, userToUnfollowId} = unfollowRequest
            FollowDatabase.connection.initialize()
            await FollowDatabase.connection.raw(`
            DELETE FROM ${this.followTable} WHERE
                fk_follower = "${follower}" AND fk_userToFollow = "${userToUnfollowId}";
            `)
        }
        catch (error:any) {
            throw new Error(error.message)
        }
    }
}