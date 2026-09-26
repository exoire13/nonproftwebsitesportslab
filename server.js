const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDirectory = __dirname;
const routes = {
  '/': 'index.html',
  '/programs': 'programs.html',
  '/mission': 'mission.html',
  '/story': 'story.html',
  '/contact': 'contact.html',
};
const mimeTypes = { '.css': 'text/css', '.js': 'application/javascript', '.html': 'text/html' };

http.createServer((request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  const fileName = routes[pathname] || pathname.slice(1);
  const filePath = path.resolve(rootDirectory, fileName);

  if (!filePath.startsWith(rootDirectory) || !fs.existsSync(filePath)) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Page not found');
    return;
  }

  response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(response);
}).listen(3000, () => console.log('Breakthrough Sports Foundation is running at http://localhost:3000'));
