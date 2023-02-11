import dotenv from 'dotenv'
import knex from 'knex'

dotenv.config()

export const connection= knex({
   client: "mysql",
   connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: 3306,
      multipleStatements: true
   }
})

connection
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

   `)
   .then(() => {
      console.log(`Tables created successfully!`)
})
.catch((error: any) => console.log(error.sqlMessage || error.message))
