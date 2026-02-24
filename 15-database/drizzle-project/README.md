# Steps followed

## 1. Setting up database

1. create `docker-compose.yml`
   ```yaml
   services:
   postgres:
     image: postgres:17.4
     ports:
       - 5432:5432
     environment:
     POSTGRES_DB: bookshelf_databse
     POSTGRES_USER: maverick
     POSTGRES_PASSWORD: maverick650
   ```
2. Run this using `docker compose up -d`

## 2. Setup for Drizzle in node

1.  create node project `npm init -y`

2.  install 2 packages drizzle and pg pakcage in npm
    - `drizzle-orm` : A type-safe ORM for TS/JS used to define database schemas and write strongly-typed SQL queries (works great with PostgreSQL).
    - `pg` : The official PostgreSQL client for Node.js used to connect your app to a PostgreSQL database and execute queries.

3.  `db/index.js` to initiate the database connection

    ```js
    const { drizzle } = require('drizzle-orm/node-postgres');
    const databaseConnection = drizzle(
      'postgresql://maverick:maverick650@localhost:5432/bookshelf_database'
    );

    /*
    postgresql://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
    
    - `postgresql://` – The protocol that tells the system you’re connecting to a PostgreSQL database.
    - `USERNAME` – The database user account used for authentication.
    - `PASSWORD` – The password for that database user.
    - `HOST` – The server address where PostgreSQL is running (e.g., `localhost`, Docker service name, or cloud host).
    - `PORT` – The network port PostgreSQL is listening on (default is `5432`).
    - `DATABASE` – The specific database name you want to connect to.
    */

    module.exports = { databaseConnection };
    ```

4.  `drizzle/` for storing drizzle migration files
    1. Create schema for database table

    ```js
    // drizzle/schema/user.schema.js
    const { pgTable, integer, varchar } = require('drizzle-orm/pg-core');
    const userSchema = pgTable('users', {
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      name: varchar({ length: 255 }).notNull(),
      age: integer().notNull(),
      email: varchar({ length: 255 }).notNull().unique(),
    });
    module.exports = { userSchema };
    ```

5.  Create data base tables using schema
    1. installing dev dependency `drizzle-kit` A CLI tool for Drizzle ORM used to generate and manage database migrations, push schema changes, and introspect your database.
    2. `drizzle.config.js` for creating configuration of drizzle

    ```js
    const { defineConfig } = require('drizzle-kit');
    const drizzleConfig = defineConfig({
      dialect: 'postgresql',
      out: './',
      schema: './drizzle/schema/user.schema.js',
      dbCredentials: {
        url: 'postgresql://maverick:maverick650@localhost:5432/bookshelf_database',
      },
    });
    module.exports = { drizzleConfig };
    ```

        - `defineConfig` – A helper from `drizzle-kit` used to define and validate the configuration for Drizzle CLI.
        - `dialect` – Specifies which database type you are using (here `postgresql`) so Drizzle knows how to generate correct SQL.
        - `out` – Defines the folder where generated migration files will be stored.
        - `schema` – Points to the file(s) that contain your Drizzle table schema definitions.
        - `dbCredentials` – Contains the database connection details used by Drizzle Kit to connect to your database.
        - `url` – The PostgreSQL connection string used to access the database for running migrations or introspection.
        - `module.exports` – Exports the configuration so `drizzle-kit` CLI can read and use it.

    3. Run `npx drizzle-kit push`. This uses `drizzle.config.js` and creates the database table
    4. To see the change either login to db or Run `npx drizzle-kit studio`. It Starts a local web-based GUI that lets you view and manage your PostgreSQL database tables and data visually during development.

6.  Making DATA CRUD operations on database

    ```js
    // index.js
    const { databaseConnection } = require('./db/index.js');
    const { userSchema } = require('./drizzle/schema/user.schema');
    async function getAllUserRecord() {
      const users = await databaseConnection.select().from(userSchema);
      console.log(users);
    }
    async function createUserRecord({ id, name, age, email }) {
      await databaseConnection.insert(userSchema).values({
        name: name,
        age: age,
        email: email,
      });
    }
    createUserRecord({ name: 'Jack', age: 24, email: 'jack@mail.com' });
    createUserRecord({ name: 'Emma', age: 28, email: 'emma@mail.com' });
    createUserRecord({ name: 'Liam', age: 22, email: 'liam@mail.com' });
    createUserRecord({ name: 'Olivia', age: 30, email: 'olivia@mail.com' });
    createUserRecord({ name: 'Noah', age: 26, email: 'noah@mail.com' });
    createUserRecord({ name: 'Sophia', age: 27, email: 'sophia@mail.com' });
    createUserRecord({ name: 'Ava', age: 25, email: 'ava@mail.com' });
    createUserRecord({ name: 'Ethan', age: 29, email: 'ethan@mail.com' });
    const userRecords = getAllUserRecord();
    console.log(userRecords);
    ```

7.  Removing database hardcodes
    1. install `dotenv`
       - dotenv is a small Node.js package that loads variables from a .env file into process.env.
       - It lets you store configuration values (like passwords and API keys) outside your source code.
    2. create `.env` file in root directory and define environment variable in it `VARIABLE_NAME: value`
    3. load env file in the project before everything (first line of ./index.js) using `require('dotenv').config()`
    4. use where every required using `process.env.VARIABLE_NAME`
       > .env file is never share with original credentials, if require replace all its values wit dummy and then pass it on.
