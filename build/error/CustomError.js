"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.InvalidPassword = exports.UserNotFound = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
    }
}
exports.CustomError = CustomError;
class UserNotFound extends CustomError {
    constructor() {
        super(404, "Usuário não encontrado");
    }
}
exports.UserNotFound = UserNotFound;
class InvalidPassword extends CustomError {
    constructor() {
        super(400, "Senha inválida");
    }
}
exports.InvalidPassword = InvalidPassword;
class Unauthorized extends CustomError {
    constructor() {
        super(401, "Usuário não autorizado");
    }
}
exports.Unauthorized = Unauthorized;
