import http from 'http';
import twitterDB from './db.js';

const server = http.createServer((request, response) => {
  console.log(`New Request Received on path "${request.url}" at ${Date()}`);

  const requestMethod = request.method;
  const requestUrl = request.url;

  console.log('requestMethod : ' + requestMethod);
  console.log('requestUrl : ' + requestUrl);

  switch (requestMethod) {
    case 'GET':
      switch (requestUrl) {
        case '/':
          response.writeHead(200);
          return response.end('Hello 👋, You landed on homepage.');

        case '/info':
          response.writeHead(200);
          return response.end(
            JSON.stringify({
              email: 'mail.meghsham@gmail.com',
              contact: '80557 23688',
            })
          );

        case '/tweets':
          response.writeHead(200);

          return response.end(JSON.stringify(Array.from(twitterDB)));
        default:
          response.writeHead(404);
          return response.end('Wrong path entered');
      }
      break;

    case 'POST':
      switch (requestUrl) {
        case '/tweets':
          let body = '';

          request.on('data', (chunk) => {
            body += chunk.toString();
          });

          request.on('end', () => {
            console.log('Request body:', body);

            // Parse JSON if needed
            try {
              const parsedBody = JSON.parse(body);
              console.log('Parsed body:', parsedBody);
            } catch (e) {
              console.log('Body is not JSON');
            }

            // Send response here
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ success: true }));
          });
          return;
      }
  }
});

server.listen(8000, () => {
  console.log('Server started listing on port 8000');
});
ḥ;
