# Simple Node.js Routing Server

A minimal web server built with Node's built-in `http` module — no frameworks.
It maps URL paths to HTML files and serves them, with a 404 page as a fallback.

## How It Works

- A `routes` object maps URL paths to filenames (a dictionary lookup,
  instead of a chain of if/else statements).
- `req.url` is used as the key to look up which file to serve.
- If the path isn't in the map → `404.html` is served with a 404 status.
- Files are read asynchronously with `fs.readFile`; the response is sent
  from inside the callback, once the file is fully read.
- `res.end(data)` sends the contents and finishes the response.

**Read comments inside index.js**
