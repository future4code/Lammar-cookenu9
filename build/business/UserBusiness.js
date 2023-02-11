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
exports.UserBusiness = void 0;
const CustomError_1 = require("../error/CustomError");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
const idGenerator = new IdGenerator_1.IdGenerator();
const authenticator = new Authenticator_1.Authenticator();
class UserBusiness {
    constructor(userDatabase) {
        this.userDatabase = userDatabase;
        this.signup = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = input;
                const id = idGenerator.generateId();
                const user = {
                    id: id,
                    name: name,
                    email: email,
                    password: password
                };
                yield this.userDatabase.signup(user);
                const token = authenticator.generateToken({ id });
                return token;
            }
            catch (error) {
                throw new Error;
                console.log(error);
            }
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = input;
                const user = yield this.userDatabase.findUserByEmail(email);
                if (!user) {
                    throw new CustomError_1.UserNotFound();
                }
                if (user.password !== password) {
                    throw new CustomError_1.InvalidPassword();
                }
                const { id } = user;
                const token = authenticator.generateToken({ id });
                return token;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.getUserInfo = (token) => __awaiter(this, void 0, void 0, function* () {
            const { id } = authenticator.verifyToken(token);
            console.log(id);
            const userInfo = yield this.userDatabase.getUserInfo(id);
            return userInfo;
        });
    }
}
exports.UserBusiness = UserBusiness;
