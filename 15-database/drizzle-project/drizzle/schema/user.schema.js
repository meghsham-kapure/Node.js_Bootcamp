const { pgTable, integer, varchar } = require('drizzle-orm/pg-core');

const userSchema = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

module.exports = { userSchema };
