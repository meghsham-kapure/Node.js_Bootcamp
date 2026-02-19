# Express JS

## Why Use Express

- You can build a server using the built-in `http` module but as the project grows, managing routes and logic becomes complex.
- Express is a framework that:
  - Internally uses the `http` module.
  - Provides a cleaner and structured way to build server applications.
  - Makes development easier for teams and large codebases.

## Express Setup

### 1. Initialize a Node Project

```bash
npm init
```

This creates a package.json file.

### 2. Install Express

```bash
npm install express
```

### 3. Optional: Install Type Definitions

```bash
npm install @types/node
npm install @types/express
```

Purpose:

- VS Code uses the TypeScript engine to analyze JavaScript files.
- Even in .js files, it can:
  - Detect likely types
  - Suggest correct function arguments
  - Show available methods
  - Warn about common mistakes

This only improves editor support. Your project still runs as normal JavaScript.

### 4. Optional: Enable ES Modules

Add this inside package.json:

```json
"type": "module"
```

This allows using import and export syntax.

### 5. Add Run Scripts

Add inside package.json:

```json
"scripts": {
  "start": "node main.js",
  "dev": "node --watch main.js"
}
```

- start: Runs the project normally.
- dev: Runs the project in watch mode and restarts on file changes.

## Creating an Express Server

### 1. Import and Initialize Express

```js
import express from 'express';

const app = express();
```

### 2. Add Middleware

```js
app.use(express.json());
```

- Converts JSON string from the request body into a JavaScript object.
- Makes parsed data available in req.body.

### 3. Define Routes

- `.status(number)` sets the HTTP status code.
- `.json(data)` sends JSON as a response.
- `.end(data)` ends the response and sends raw data.

```js
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the HttpServer!' });
});

app.get('/contact-us', (req, res) => {
  res.status(200).json({
    mail: 'mail.meghsham@gmail.com',
    phone: '7066326068',
  });
});

app.post('/tweets', (req, res) => {
  const tweet = {
    username: 'spider-man',
    tweet: 'With great power comes great responsibility',
    status: 'posted',
  };

  res.status(201).json(tweet);
});

app.get('/tweets', (req, res) => {
  res.status(200).json([
    {
      username: 'sudo-coder',
      tweet: 'I may have failed, but I am still not lost',
    },
    {
      username: 'goofy-tester',
      tweet: 'Dream, Fight, Hustle, Dominate',
    },
  ]);
});
```

### 4. Start the Server

```js
app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
```

- The server starts on port 8000.
- You can access it at [http://localhost:8000](http://localhost:8000).
