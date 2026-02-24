const { defineConfig } = require('drizzle-kit');

const drizzleConfig = defineConfig({
  dialect: 'postgresql',
  out: './drizzle/migration-files',
  schema: './drizzle/schema/user.schema.js',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

module.exports = drizzleConfig;
