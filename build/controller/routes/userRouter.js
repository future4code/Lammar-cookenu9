"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserBusiness_1 = require("../../business/UserBusiness");
const UserDatabase_1 = require("../../data/mySQL/UserDatabase");
const UserController_1 = require("../UserController");
exports.userRouter = express_1.default.Router();
const userDatabase = new UserDatabase_1.UserDatabase;
const userBusiness = new UserBusiness_1.UserBusiness(userDatabase);
const userController = new UserController_1.UserController(userBusiness);
exports.userRouter.post("/signup", (req, res) => userController.signup(req, res));
exports.userRouter.post("/login", (req, res) => userController.login(req, res));
exports.userRouter.get("/", (req, res) => userController.getUserInfo(req, res));
