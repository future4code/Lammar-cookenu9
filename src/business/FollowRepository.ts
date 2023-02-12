import { FollowRequest, unfollowRequest } from "../model/follow";

export interface FollowRepository {
    followUser(followRequest: FollowRequest):Promise<void>,
    getFollowList(id: String):Promise<string[]>
    unfollowUser(followRequest: unfollowRequest):Promise<void>
}