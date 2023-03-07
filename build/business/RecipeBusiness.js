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
exports.RecipeBusiness = void 0;
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
const idGenerator = new IdGenerator_1.IdGenerator();
const authenticator = new Authenticator_1.Authenticator();
class RecipeBusiness {
    constructor(recipeDatabase) {
        this.recipeDatabase = recipeDatabase;
        this.createRecipe = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, title, description } = input;
                const createdBy = authenticator.verifyToken(token).id;
                const createdAt = new Date();
                const id = idGenerator.generateId();
                const recipe = {
                    id: id,
                    title: title,
                    description: description,
                    createdBy: createdBy,
                    createdAt: createdAt
                };
                yield this.recipeDatabase.createRecipe(recipe);
            }
            catch (error) {
                throw new Error();
            }
        });
        this.getRecipe = (getRecipeInput) => __awaiter(this, void 0, void 0, function* () {
            const { token, recipeId } = getRecipeInput;
            const { id } = authenticator.verifyToken(token);
            const recipeInfo = yield this.recipeDatabase.getRecipeInfo(recipeId);
            return recipeInfo;
        });
    }
}
exports.RecipeBusiness = RecipeBusiness;
