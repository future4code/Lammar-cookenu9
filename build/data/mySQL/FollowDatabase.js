"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class FollowDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.followTable = 'cookenu_follows';
        this.followUser = (followRequest) => __awaiter(this, void 0, void 0, function* () {
            try {
                FollowDatabase.connection.initialize();
                yield FollowDatabase.connection.insert({
                    id: followRequest.id,
                    fk_follower: followRequest.follower,
                    fk_userToFollow: followRequest.userToFollowId
                }).into(this.followTable);
            }
            catch (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
        });
        // public getFriendlist = async (id: string): Promise<string[]> => {
        //     try {
        //         FriendshipDatabase.connection.initialize()
        //         const list1:any = await FriendshipDatabase.connection('labook_friendships')
        //         .select('fk_account as friend' )
        //         .where('fk_account2', id)
        //         const list2:any = await FriendshipDatabase.connection('labook_friendships')
        //         .select('fk_account2 as friend')
        //         .where('fk_account', id)
        //         const queryResult = list1.concat(list2).map(
        //             (id:any) => id.friend
        //         )
        //         return(queryResult)
        //     }
        //     catch (error:any) {
        //         console.log(error.message)
        //         throw new Error(error.message)
        //     }
        // }
        // public deleteFriendship = async (friendshipDeleteRequest:FriendshipDeleteRequest): Promise<void> => {
        //     try{
        //         const {accountId, friendId} = friendshipDeleteRequest
        //         FriendshipDatabase.connection.initialize()
        //         await FriendshipDatabase.connection.raw(`
        //         DELETE FROM labook_friendships WHERE
        //             fk_account = ${accountId} AND fk_account2 = ${friendId}
        //             OR fk_account = ${friendId} AND fk_account2 = ${accountId};
        //         `)
        //     }
        //     catch (error:any) {
        //         throw new Error(error.message)
        //     }
        //     finally{
        //         console.log("Conexão encerrada")
        //         FriendshipDatabase.connection.destroy()
        //     }
        // }
    }
}
exports.FollowDatabase = FollowDatabase;
