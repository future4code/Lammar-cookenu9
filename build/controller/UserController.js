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
exports.UserController = void 0;
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const input = {
                    name,
                    email,
                    password
                };
                const token = yield this.userBusiness.signup(input);
                res.status(201).send({ message: "Usuário criado com sucesso", token });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const input = {
                    email,
                    password
                };
                const token = yield this.userBusiness.login(input);
                res.status(200).send({ token });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const profile = yield this.userBusiness.getProfile(token);
                res.status(200).send(profile);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const userId = req.params.id;
                const getUserInput = {
                    token: token,
                    userId: userId
                };
                const userInfo = yield this.userBusiness.getUser(getUserInput);
                res.status(200).send(userInfo);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.UserController = UserController;
