import express from 'express';
import fs from 'node:fs';

const app = express();
const port = 8080;

app.use(express.json());

app.use((req, res, next) => {
  const logLine = `${Date.now()} || ${req.method} || ${JSON.stringify(req.body)} \n`;
  fs.appendFileSync('./log/logs.txt', logLine, 'utf-8');
  next();
});

app.use((req, res, next) => {
  if (req.method === 'GET') next();
  else res.status(404).json({ error: `${req.method} is not allowed` });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

function createRandomNumber(req, res, next) {
  req.randomNumber = Math.floor(Math.random() * 1000000);
  next();
}

app.get('/random', createRandomNumber, (req, res) => {
  res.status(200).json({ randomNumber: req.randomNumber });
});

app.listen(port, () => {
  console.log(`App starts listing on PORT : ${port}`);
});
