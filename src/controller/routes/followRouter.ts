import express from "express";
import { FollowBusiness } from "../../business/FollowBusiness";
import { FollowDatabase } from "../../data/mySQL/FollowDatabase";
import { FollowController } from "../FollowController";

export const followRouter = express.Router()

const followDatabase = new FollowDatabase;
const followBusiness = new FollowBusiness(followDatabase)
const followController = new FollowController(followBusiness);

followRouter.post("/", (req,res) => followController.followUser(req,res))
followRouter.delete("/", (req,res) => followController.unfollowUser(req,res))