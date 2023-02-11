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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.userTable = 'cookenu_users';
        this.signup = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                UserDatabase.connection.initialize();
                yield UserDatabase.connection.insert({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password
                }).into(this.userTable);
            }
            catch (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
        });
        this.findUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                UserDatabase.connection.initialize();
                const result = yield UserDatabase.connection(this.userTable)
                    .where('email', email);
                return result[0];
            }
            catch (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
        });
        this.getUserInfo = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                UserDatabase.connection.initialize();
                const result = yield UserDatabase.connection(this.userTable)
                    .where('id', id);
                return result[0];
            }
            catch (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
        });
    }
}
exports.UserDatabase = UserDatabase;
