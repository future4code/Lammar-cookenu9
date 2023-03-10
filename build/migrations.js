"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const knex_1 = __importDefault(require("knex"));
dotenv_1.default.config();
exports.connection = (0, knex_1.default)({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: 3306,
        multipleStatements: true
    }
});
exports.connection
    .raw(`
      CREATE TABLE IF NOT EXISTS cookenu_users(
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS cookenu_recipes(
         id VARCHAR(255) PRIMARY KEY,
         created_by VARCHAR(255),
         title VARCHAR(255) NOT NULL,
         description VARCHAR(2500) NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         FOREIGN KEY (created_by) REFERENCES cookenu_users (id)
      );

      CREATE TABLE IF NOT EXISTS cookenu_follows(
         id VARCHAR(255) PRIMARY KEY,
         fk_follower VARCHAR(255),
         fk_userToFollow VARCHAR(255),
         FOREIGN KEY (fk_follower) REFERENCES cookenu_users (id),
         FOREIGN KEY (fk_userToFollow) REFERENCES cookenu_users (id)
      );


   `)
    .then(() => {
    console.log(`Tables created successfully!`);
})
    .catch((error) => console.log(error.sqlMessage || error.message));
