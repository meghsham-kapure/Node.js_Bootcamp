# Client and server Architecture

- Client is machine which can make a request to the server which can be Browser, Web/Mobile app, IoT device or Any internet-enabled device
- Server is machine which can receive the request, Does processing, adds / deletes / modify resources on database and Returns response
- Processing inside server can involve many tasks but Database interaction is most critical because it stores and manages the core application data that almost every request depends on.

# Database

- A database is the system used to store the data electronically and DBMS is the management system used along side the database.
- DBMS can categorize as
  1. SQL Database / Relational Database
  2. NoSQL Database / Non-Relational Database

## SQL Database / Relational Database

- A SQL database is a structured system used to store application data in tables with predefined schemas.
- It follows a strict schema, meaning every record must match the table definition.
- Relationships between data are created using primary keys and foreign keys, allowing one-to-one, one-to-many, and many-to-many relationships.
- The database enforces rules such as preventing duplicate entries and rejecting references to non-existent records, ensuring strong referential integrity.
- Because validations and constraints are handled at the database level, data consistency is guaranteed.
- SQL databases are ideal for applications that require structured data, complex queries, and high reliability.
- Common examples include PostgreSQL and MySQL.

## NoSQL Database / Non-Relational Database

- A NoSQL database is a flexible system designed to store data without a fixed schema and data is commonly stored as JSON-like documents, key-value pairs, graphs, or wide-column formats.
- The structure is dynamic, allowing developers to add or modify fields at any time without altering a predefined schema.
- Relationships are usually embedded directly within documents rather than enforced through foreign keys.
- NoSQL systems do not automatically enforce relational integrity, so validation and consistency checks must be handled in the application code.
- This flexibility makes NoSQL databases easier to scale and better suited for rapidly changing or loosely structured data.
- A common example is MongoDB.

## Setting up Postgres with Docker

1.  Install Docker
2.  Inside the root of project folder create `docker-compose.yml`

```yml
services: # Defines all containers (services) in docker-compose
  postgresql: # Service name  of  container
    image: postgres:17.4 # using image PostgreSQL version 17.4

    ports: # Defines port mapping between host and container
      - 5432:5432 # Maps host port 5432 to container port 5432

    environment: # Sets environment variables for PostgreSQL setup
      POSTGRES_DB:zz # Creates database named bookstore_db
      POSTGRES_USER: postgres # Sets default PostgreSQL username
      POSTGRES_PASSWORD: pass@1234 # Sets password for the user
```

## What is ORM?

- ORM (Object Relational Mapping) is a software layer that acts as a bridge between your application code and a database.
- It translates objects used in programming languages (like JavaScript objects) into database queries (SQL) and converts database results back into objects.
- In simple words, ORM allows you to interact with a database using normal programming syntax instead of writing raw SQL queries manually.
- ORM translates between them automatically reducing SQL writing and improves single language codebase with better code readability and maintainability.

## Which ORMs Are Used and With What?

With JavaScript and Node.js, commonly used ORMs are:

### Drizzle

Used to pair Node.js with relational databases like PostgreSQL and MySQL. It is lightweight, SQL-focused, and optimized for RDBMS with strong type safety and better performance control.

- Pros: Lightweight, efficient SQL generation, closer to raw SQL, better performance control.
- Cons: Less abstraction; you write more SQL-like logic compared to Prisma.
- Use Case: Performance-critical applications, backend systems where you want strong SQL control and solid relational database fundamentals.

### Mongoose

Used to pair Node.js specifically with MongoDB. It is optimized for document-based data modeling and provides schema validation for MongoDB collections.

- Pros: Developer-friendly, strong schema validation, excellent for document-based data.
- Cons: Not suitable for relational joins (MongoDB limitation), can face performance issues in complex relational-like queries (N+1 patterns).
- Use Case: Applications built fully on MongoDB, such as content platforms, logging systems, or flexible schema systems.

### Prisma

Used to pair Node.js with relational databases (PostgreSQL, MySQL) and also MongoDB. It provides a very developer-friendly API, strong tooling, migrations, and auto-generated types.

- Pros: Excellent developer experience, auto-generated types, clean API, strong migration tooling, supports multiple databases.
- Cons: Extra abstraction layer can introduce performance overhead; less control over raw SQL optimizations in complex queries.
- Use Case: Startups, SaaS products, rapid development environments, and teams that prioritize productivity and maintainability over fine-grained SQL control.

### Use cases

- Choose Drizzle for performance and strong SQL control.
- Choose Mongoose when working purely with MongoDB.
- Choose Prisma for productivity, tooling, and multi-database flexibility.

## How ORM Works

![ORM Working](<ORM Working.png>)

### Insert Data

1. Insert (Store Data) : Node creates a JavaScript object `const user = { id: 1, name: 'Piyush' }`
2. ORM converts it into an SQL query (for databases like PostgreSQL) `INSERT INTO users (id, name) VALUES (1, 'Piyush')`
3. The database stores it in a table (rows & columns).

### Fetch Data

1. Node makes a request to fetch user data, for example `await db.user.findUnique({ where: { id: 1 } })`
2. ORM converts it into an SQL query `SELECT * FROM users WHERE id = 1`
3. Database processes the request and returns row data.
4. ORM converts it back into a JavaScript object `{ id: 1, name: "Piyush" }`

> Automatic ORM translation flow: `JS Object → SQL Query → Database Table → SQL Result → JS Object`

Along with this translations ORM also does

1. Maintain database connectio
2. Handle schema mapping
3. Manage migrations

# Drizzle

## `drizzle-orm`

- `drizzle-orm` is A TypeScript/JavaScript ORM (Object Relational Mapper) for databases like PostgreSQL.
- Its used to:
  - Connect to the database
  - Run queries or Insert / update / delete data
  - Select data safely
  - Get type safety
- It is use when your application is running and needs either query or manipulate the data in database like Fetch users, Create records, Update data, Delete rows
- To use it install using `npm install drizzle-orm`
- Connect the app with node application

  ```js
  const { drizzle } = require('drizzle-orm/node-postgres');
  const db = drizzle(process.env.DATABASE_URL); // database connection string is provided to drizzle
  module.exports = db;
  ```

- This connection can be later used to perform DQL and DML
  ```js
  await db.select().from(users);
  await db.insert(users).values({ name: 'Maverick' });
  ```

## `drizzle-kit`

- `drizzle-kit` it is a CLI migration tool for managing your database schema. Used to:
  - Update database structure
  - Sync schema with DB
  - Create tables automatically
  - Generate migration files
- So its used when creating / modifying the structure of table

- To use it install using `npm install drizzle-kit --save-dev` and Create config file

  ```js
  // `drizzle.config.js`
  const { defineConfig } = require('drizzle-kit');

  const config = defineConfig({
    dialect: 'postgresql',
    out: './drizzle',
    schema: './drizzle/schema.js',
    dbCredentials: {
      url: process.env.DATABASE_URL,
    },
  });

  module.exports = config;
  ```

  Here
  `dialect` -> Which database engine to used
  `out` -> Where migration files go
  `schema` -> Where your tables are defined
  `dbCredentials` -> How to connect to DB

## `drizzle-studio` commands

1. `npx drizzle-kit generate` : create migration files from schema
2. `npx drizzle-kit push` : directly apply schema to database
3. `npx drizzle-kit migrate` : run existing migration files

4. Run the `docker-compose.yml`

- Start
  - `docker compose up `
  - `docker compose up -d` (For detached mode)
- Stop
  - `docker compose down`

4. Initialize project and install dependencies

## Setting up Drizzle

```bash
npm init -y #Project initialization
npm install express drizzle-orm pg dotenv
npm install -D drizzle-kit
nmp install -D @types/node @types/express @types/pg
```

- `drizzle-orm` → runtime library (query builder)
- `pg` → PostgreSQL driver
- `dotenv` → load `.env` variables
- `drizzle-kit` → CLI for migrations, studio, push schema, etc.

4. Create folder structureFolder Structure (recommended)

```text
project/
├── docker-compose.yml
├── drizzle.config.js
├── package.json
├── package-lock.json
├── node_modules
└── src
    ├── db
    │   └── index.js
    ├── drizzle-schema
    │   └── schema.js
    └── index.js
```

### 4. Database Connection (`db/index.js`)

```js
// db/index.js
const { drizzle } = require('drizzle-orm/node-postgres');
const db = drizzle(process.env.DATABASE_URL);

module.exports = db;
```

### 5. Define Schema (`drizzle/schema.js`) and Creating tables with `drizzle-kit`

- drizzle-orm/pg-core is used to define a PostgreSQL table schema.
- Using `drizzle-orm/pg-core` (most important & commonly used only):
  - Table: `pgTable()`,
  - Column Types : `serial()`, `integer()`, `varchar()`, `text()`, `boolean()`, `timestamp()`, `uuid()`,
  - Column Constraints / Modifiers : `.primaryKey()`, `.notNull()`, `.unique()`, `.default()`, `.references()`,
  - Keys (table-level) : `primaryKey()`,
  - Indexes : `index()`, `uniqueIndex()`,

```js
// drizzle/schema.js
require('dotenv/config');

const { pgTable, varchar, integer } = require('drizzle-orm/pg-core');

const usersSchema = pgTable('user', {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

const employeeSchema = pgTable('user', {
  eid: integer().primaryKey(),
  designation: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  salary: integer(),
});

module.exports = {
  usersSchema,
  employeeSchema,
};
```

### 6. Drizzle Configuration (`drizzle.config.js`)

```js
// drizzle.config.js
// drizzle/schema.js
const { defineConfig } = require('drizzle-kit');

const config = defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './drizzle/schema.js',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

module.exports = config;
```

### 7. Push schema to database (one-time / dev)

```bash
npx drizzle-kit push
```

→ Reads schema.js
→ Creates/alters tables in PostgreSQL
→ No migration files generated (direct push – good for dev)

### 8. Drizzle Studio (nice GUI to view tables)

```bash
npx drizzle-kit studio
```

→ Opens http://localhost:4983
→ See tables, data, run quick SQL

### 9. Example Queries

```js
// Example: insert & select (in any file)
const { db } = require('../db');
const { users } = require('../drizzle/schema');

async function createUser() {
  await db.insert(users).values({
    name: 'Piyush',
    email: 'piyush@example.com',
    age: 28,
  });
}

async function getAllUsers() {
  const allUsers = await db.select().from(users);
  console.log(allUsers);
}
```
