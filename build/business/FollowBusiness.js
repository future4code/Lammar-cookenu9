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
exports.FollowBusiness = void 0;
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
const idGenerator = new IdGenerator_1.IdGenerator();
const authenticator = new Authenticator_1.Authenticator();
class FollowBusiness {
    constructor(followDatabase) {
        this.followDatabase = followDatabase;
        this.followUser = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, userToFollowId } = input;
                const follower = authenticator.verifyToken(token).id;
                const id = idGenerator.generateId();
                const followRequest = {
                    id: id,
                    follower: follower,
                    userToFollowId: userToFollowId
                };
                yield this.followDatabase.followUser(followRequest);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.FollowBusiness = FollowBusiness;
