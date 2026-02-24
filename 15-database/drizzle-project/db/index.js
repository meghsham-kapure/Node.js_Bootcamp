const { drizzle } = require('drizzle-orm/node-postgres');


const databaseConnection = drizzle(process.env.DATABASE_URL);

module.exports = { databaseConnection };
