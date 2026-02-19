import http from 'node:http';

const myHttpServer = http.createServer((req, res) => {
  console.log(`Request Received: ${req.url}`);

  setTimeout(() => {
    switch (req.url) {
      case '/':
        res.writeHead(200);
        return res.end('You are on the HOMEPAGE');

      case '/contact':
        res.writeHead(200);
        return res.end('You are on the CONTACTS-PAGE');

      case '/about':
        res.writeHead(200);
        return res.end('You are on the ABOUT-PAGE');

      case '/products':
        res.writeHead(200);
        return res.end('You are on the PRODUCTS-PAGE');

      default:
        res.writeHead(404);
        return res.end('Requested page does not exists');
    }
  }, 3000);
});

myHttpServer.listen(8000, () => console.log('myHttpServer started listening on Port 8000'));
