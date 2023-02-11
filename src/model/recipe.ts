export type Recipe = {
    id : string,
    createdBy : string,
    title : string,
    description : string,
    createdAt : Date
}

export interface RecipeInputDTO {
    token: string,
    title: string,
    description: string,
}