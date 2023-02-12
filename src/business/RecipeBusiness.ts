import { Recipe, RecipeInputDTO, GetRecipeDTO } from "../model/recipe";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { RecipeRepository } from "./RecipeRepository";

const idGenerator = new IdGenerator()
const authenticator = new Authenticator()

export class RecipeBusiness {

    constructor (private recipeDatabase: RecipeRepository) {}

    public createRecipe = async (input:RecipeInputDTO) => {
        try {
            const {token, title, description} = input
            const createdBy = authenticator.verifyToken(token).id
            const createdAt = new Date()
            const id = idGenerator.generateId()
            const recipe: Recipe = {
                id: id,
                title: title,
                description: description,
                createdBy: createdBy,
                createdAt: createdAt
            }
            
            await this.recipeDatabase.createRecipe(recipe)
        } catch (error) {
            throw new Error()
        }  
    }

    public getRecipe = async (getRecipeInput:GetRecipeDTO) => {
        const {token, recipeId} = getRecipeInput
        const {id} = authenticator.verifyToken(token)
        const recipeInfo = await this.recipeDatabase.getRecipeInfo(recipeId)
        return recipeInfo
    }

}