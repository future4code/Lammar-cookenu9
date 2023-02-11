import {Request, Response} from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { RecipeInputDTO } from "../model/recipe";

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
}