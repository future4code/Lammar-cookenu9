import {Request, Response} from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { GetRecipeDTO, RecipeInputDTO } from "../model/recipe";

export class RecipeController {

    constructor(private recipeBusiness : RecipeBusiness) {
    }

    
    public createRecipe = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {title, description} = req.body
            const input: RecipeInputDTO = {
                token,
                title,
                description
            }
            await this.recipeBusiness.createRecipe(input)
            res.status(201).send("Receita criada com sucesso!")
            
        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }

    public getRecipe = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const recipeId = req.params.id
            const getRecipeInput: GetRecipeDTO = {
                token : token,
                recipeId : recipeId
            }
            const userInfo = await this.recipeBusiness.getRecipe(getRecipeInput);
            res.status(200).send(userInfo)
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }
}