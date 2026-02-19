import express from 'express';

const app = express();

// express.json() middleware that converts a JSON string from the request body into a JavaScript object.
app.use(express.json());

app.get('/', (request, response) => {
  response.status(200).json({ message: 'Hello from the HttpServer 👋🏽!' });
});

app.get('/contact-us', (request, response) => {
  response.status(200).json({
    mail: 'mail.meghsham@gmail.com',
    phone: '7066326068',
  });
});

app.post('/tweets', (request, response) => {
  const tweet = {
    username: 'spider-man',
    tweet: 'With grate power comes great responsibility',
    status: 'posted',
  };
  response.status(201).json(tweet);
});

app.get('/tweets', (request, response) => {
  response.status(200).json([
    {
      Tweet1: {
        username: 'sudo-coder',
        tweet: 'I may be failed, but I am still not lost',
      },
    },
    {
      Tweet2: {
        username: 'goofy-tester',
        tweet: 'Dream, Fight, Hustle, Dominate',
      },
    },
  ]);
});

app.listen(8000, () => console.log('Server is listening on th PORT 8000'));
