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
exports.RecipeDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class RecipeDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.recipeTable = 'cookenu_recipes';
        this.createRecipe = (recipe) => __awaiter(this, void 0, void 0, function* () {
            try {
                RecipeDatabase.connection.initialize();
                yield RecipeDatabase.connection.insert({
                    id: recipe.id,
                    createdBy: recipe.createdBy,
                    title: recipe.title,
                    description: recipe.description,
                    createdAt: recipe.createdAt
                }).into(this.recipeTable);
            }
            catch (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
        });
    }
}
exports.RecipeDatabase = RecipeDatabase;
