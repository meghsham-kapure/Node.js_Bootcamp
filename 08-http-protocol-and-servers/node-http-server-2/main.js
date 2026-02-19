import http from 'node:http';
import fs from 'node:fs';

let requestCounter = 0;
const port = 8000;

const server = http.createServer((request, response) => {
  const method = request.method;
  const path = request.url;

  fs.appendFileSync(
    './logs/log.txt',
    `${Date.now()} :: Http Request ${requestCounter++} :: "${method}" :: Request on "${path}"\n`,
    'utf-8'
  );

  switch (method) {
    case 'GET':
      switch (path) {
        case '/':
          return response.writeHead(200).end('Hello from the HttpServer 👋🏽!');
        case '/contact-me':
          return response
            .writeHead(200)
            .end('Hello contact me on mail "mail.meghsham@gmail.com and" and phone "7066326068"');
        case '/tweets':
          return response
            .writeHead(200)
            .end(
              'Tweet1 : "I may be failed, but I am still not lost"\nTweet2 : "Dream, Fight, Hustle, Dominate"'
            );
        default:
          return response.writeHead(404).end('Invalid Path');
      }

    case 'POST':
      switch (path) {
        case '/tweets':
          return response.writeHead(200).end('Your tweet is created');

        default:
          return response.writeHead(404).end('Invalid Path');
      }

    default:
      return response.writeHead(404).end('Invalid Request');
  }
});

server.listen(port, () => console.log(`Hey, Server stated running on port : ${port}`));
