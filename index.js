// Import Node's built-in modules:
// http = lets us create a web server, fs = lets us read files from disk
const http = require('node:http');
const fs = require('node:fs');

// Create the server. This callback runs EVERY time a request comes in.
// req = what the browser asked for, res = what we send back
const server = http.createServer((req, res) => {
  // Map URL paths to files.
  // This is better than if statements because I can add/remove routes
  // in one place, and the lookup is a single line instead of a chain
  // of `else if (url === '...')`.
  const routes = {
    '/': 'index.html',
    '/contact': 'contact-me.html',
    '/about': 'about.html',
  };

  // Use req.url as the KEY to look up in routes.
  // req.url is whatever path the browser typed, e.g. "/about".
  // If the path isn't in our map, htmlFile is undefined.
  const htmlFile = routes[req.url];

  // If the path isn't in routes, we need to serve the 404 page instead.
  // We read 404.html and send it with status 404 so the browser knows
  // the page genuinely doesn't exist (not just that it LOOKS like an error page).
  if (!htmlFile) {
    fs.readFile('404.html', (err, data) => {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(data);
      // you can add if (err) but we pass on that for now
    });
    return; // stop here — don't fall through to the code below
  }

  // Here we read the matched file from disk and send it.
  // readFile is async, so this callback runs LATER,
  // only after the file is fully read. Then we get: err (if failed), data (file contents).
  fs.readFile(htmlFile, (err, data) => {
    if (err) {
      // File missing/unreadable — it's OUR fault (bad route config),
      // not the user's, so 500 (server error) is the right status
      res.writeHead(500);
      res.end('Server error');
      return;
    }
    // If success then send the file contents with 200 OK,
    // and tell the browser it's HTML so it renders it as a page
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data); // res.end() sends the response and finishes the request
  });
});

// Start listening for requests on port 8000
server.listen(8000);
