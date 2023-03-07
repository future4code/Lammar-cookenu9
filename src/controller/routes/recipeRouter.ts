import express from "express";
import { RecipeBusiness } from "../../business/RecipeBusiness";
import { RecipeDatabase } from "../../data/mySQL/RecipeDatabase";
import { RecipeController } from "../RecipeController";

export const recipeRouter = express.Router()

const recipeDatabase = new RecipeDatabase;
const recipeBusiness = new RecipeBusiness(recipeDatabase)
const recipeController = new RecipeController(recipeBusiness);

recipeRouter.post("/", (req,res) => recipeController.createRecipe(req,res))
recipeRouter.get("/:id", (req,res) => recipeController.getRecipe(req,res))