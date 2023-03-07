"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRouter = void 0;
const express_1 = __importDefault(require("express"));
const RecipeBusiness_1 = require("../../business/RecipeBusiness");
const RecipeDatabase_1 = require("../../data/mySQL/RecipeDatabase");
const RecipeController_1 = require("../RecipeController");
exports.recipeRouter = express_1.default.Router();
const recipeDatabase = new RecipeDatabase_1.RecipeDatabase;
const recipeBusiness = new RecipeBusiness_1.RecipeBusiness(recipeDatabase);
const recipeController = new RecipeController_1.RecipeController(recipeBusiness);
exports.recipeRouter.post("/", (req, res) => recipeController.createRecipe(req, res));
exports.recipeRouter.get("/:id", (req, res) => recipeController.getRecipe(req, res));
