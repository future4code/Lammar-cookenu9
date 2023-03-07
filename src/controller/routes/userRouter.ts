import express from "express";
import { UserBusiness } from "../../business/UserBusiness";
import { UserDatabase } from "../../data/mySQL/UserDatabase";
import { UserController } from "../UserController";

export const userRouter = express.Router()

const userDatabase = new UserDatabase;
const userBusiness = new UserBusiness(userDatabase)
const userController = new UserController(userBusiness);

userRouter.post("/signup", (req,res) => userController.signup(req,res))
userRouter.post("/login", (req,res) => userController.login(req,res))
userRouter.get("/profile", (req,res) => userController.getProfile(req,res))
userRouter.get("/profile/:id", (req,res) => userController.getUser(req,res))