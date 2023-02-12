export class CustomError extends Error {
    constructor(statusCode:number, message:string) {
        super(message)
    }
}

export class UserNotFound extends CustomError{
    constructor (){
        super(404, "Usuário não encontrado")
    }
}

export class InvalidPassword extends CustomError{
    constructor (){
        super(400, "Senha inválida")
    }
}

export class Unauthorized extends CustomError{
    constructor (){
        super(401, "Usuário não autorizado")
    }
}

export class RecipeNotFound extends CustomError{
    constructor (){
        super(404, "Receita não encontrado")
    }
}

export class InvalidUnfollowRequest extends CustomError{
    constructor (){
        super(404, "Este usuário não se encontra na sua lista de usuários seguidos")
    }
}