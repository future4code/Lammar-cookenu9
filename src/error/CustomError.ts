export class CustomError extends Error {
    constructor(public statusCode:number, public message:string) {
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