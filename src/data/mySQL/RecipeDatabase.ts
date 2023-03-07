import { RecipeRepository } from "../../business/RecipeRepository";
import { RecipeNotFound } from "../../error/CustomError";
import { Recipe } from "../../model/recipe";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase implements RecipeRepository {
    private recipeTable = 'cookenu_recipes'
    
    public createRecipe = async (recipe: Recipe): Promise<void> => {
        try {
            RecipeDatabase.connection.initialize()
            await RecipeDatabase.connection.insert({
                id: recipe.id,
                created_by: recipe.createdBy,
                title: recipe.title,
                description: recipe.description,
                created_at: recipe.createdAt
                
            }).into(this.recipeTable)
        }
        catch (error:any) {
            console.log(error.message)
            throw new Error(error.message)
        }
    }

    public getRecipeInfo = async (recipeId: string): Promise<void> => {
        try {
            RecipeDatabase.connection.initialize()
            const result = await RecipeDatabase.connection(this.recipeTable)
            .where('id', recipeId)
            if(!result[0]){
                throw new RecipeNotFound ();
            }
            return result[0]
        }
        catch (error:any) {
            console.log(error.message)
            throw new Error(error.message)
        }
    }
}