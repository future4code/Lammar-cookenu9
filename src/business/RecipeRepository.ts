import { Recipe } from "../model/recipe";

export interface RecipeRepository {
    createRecipe(recipe:Recipe):Promise<void>
    getRecipeInfo(id: string):Promise<void>
}