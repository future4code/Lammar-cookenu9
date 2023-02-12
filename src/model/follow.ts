export interface FollowRequest {
    id: string,
    follower: string,
    userToFollowId: string,
}

export interface FollowUserDTO {
    token: string,
    userToFollowId: string,
}

export interface UnfollowUserDTO {
    token: string,
    userToUnfollowId: string,
}

export interface unfollowRequest {
    follower: string,
    userToUnfollowId: string,
}