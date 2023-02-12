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
exports.FollowController = void 0;
class FollowController {
    constructor(followBusiness) {
        this.followBusiness = followBusiness;
        this.followUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { userToFollowId } = req.body;
                const input = {
                    token,
                    userToFollowId
                };
                yield this.followBusiness.followUser(input);
                res.status(201).send({ message: "Usuário seguido com sucesso" });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.FollowController = FollowController;
