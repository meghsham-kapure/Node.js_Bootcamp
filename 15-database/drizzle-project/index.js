require('dotenv').config();
const { databaseConnection } = require('./db/index.js');
const { userSchema } = require('./drizzle/schema/user.schema');

async function getAllUserRecord() {
  const users = await databaseConnection.select().from(userSchema);
  console.log(users);
  return users;
}

async function createUserRecord({ name, age, email }) {
  await databaseConnection.insert(userSchema).values({
    name: name,
    age: age,
    email: email,
  });
}

// createUserRecord({ name: 'Jack', age: 24, email: 'jack@mail.com' });
// createUserRecord({ name: 'Emma', age: 28, email: 'emma@mail.com' });
// createUserRecord({ name: 'Liam', age: 22, email: 'liam@mail.com' });
// createUserRecord({ name: 'Olivia', age: 30, email: 'olivia@mail.com' });
// createUserRecord({ name: 'Noah', age: 26, email: 'noah@mail.com' });
// createUserRecord({ name: 'Sophia', age: 27, email: 'sophia@mail.com' });
// createUserRecord({ name: 'Ava', age: 25, email: 'ava@mail.com' });
// createUserRecord({ name: 'Ethan', age: 29, email: 'ethan@mail.com' });
// createUserRecord({ name: 'Mason', age: 31, email: 'mason@mail.com' });
// createUserRecord({ name: 'Isabella', age: 23, email: 'isabella@mail.com' });

getAllUserRecord();
