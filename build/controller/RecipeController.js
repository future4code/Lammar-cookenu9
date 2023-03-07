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
exports.RecipeController = void 0;
class RecipeController {
    constructor(recipeBusiness) {
        this.recipeBusiness = recipeBusiness;
        this.createRecipe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { title, description } = req.body;
                const input = {
                    token,
                    title,
                    description
                };
                yield this.recipeBusiness.createRecipe(input);
                res.status(201).send("Receita criada com sucesso!");
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.getRecipe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const recipeId = req.params.id;
                const getRecipeInput = {
                    token: token,
                    recipeId: recipeId
                };
                const userInfo = yield this.recipeBusiness.getRecipe(getRecipeInput);
                res.status(200).send(userInfo);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.RecipeController = RecipeController;
