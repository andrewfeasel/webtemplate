# WebTemplate

WebTemplate is a minimal starter template for rapidly building static websites with a configurable Node.js HTTP server. Just clone, configure, and start developing your website—no frameworks or complex setup required!

---

## Features

- **Quick Start:** Begin development instantly after cloning.
- **Built-in HTTP Server:** No external dependencies, runs on Node.js, multi-threaded and powerful.
- **Easy Configuration:** Route URLs to files through `config.json`.
- **Custom Middleware:** Add your own logic to the request/response cycle.
- **Optional CORS:** Toggle CORS support using the configuration file.
- **Modern JavaScript:** Uses ECMAScript modules (`type: "module"` in `package.json`).
- **Server Debugging** View V8 TurboFan optimizations / GC for the backend
---

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/andrewfeasel/webtemplate.git
   cd webtemplate
   ```

2. **Install Node.js**
   Ensure you have Node.js installed (https://nodejs.org/).

3. **Run the server:**
   ```sh
   npm start
   ```
   The server listens on port **8080** by default.

4. **Open your site:**
   Go to [http://localhost:8080](http://localhost:8080) in your browser.

---

## Project Structure

- `server.js` — HTTP server entry point; spawns multiple instances of the server for scalability.
- `server-modules/` -- Contains the code for server instances, and module/utility code.
- `config.json` — Main configuration: set routes and server settings here.
- `package.json` — Declares the project as an ES module and sets the entry point.
- `app/` — Place your HTML, CSS, and JS files here (see route examples in `config.json`).

---

## Configuration

All server behavior is controlled in `config.json`. Example:
```json
{
  "settings": {
    "cors": false,
    "port": 8080
  },
  "routes": {
    "/": {
      "path": "./app/index.html",
      "type": "text/html"
    },
    "/css/style.css": {
      "path": "./app/css/style.css",
      "type": "text/css"
    },
    "/js/script.js": {
      "path": "./app/js/script.js",
      "type": "text/javascript"
    }
  }
}
```

### Routes

- Each key in `"routes"` is a URL path (e.g., `/`, `/css/style.css`).
- Each value is an object specifying the local file path and its content type.

### Settings

- `"cors": true` enables CORS headers for all responses.
- `"port": 8080` sets the TCP port to 8080
---

## Middleware

Middleware functions run before route matching and response.  
You can add your own to the `middleware` array in `server-modules/instance.js`.  
Signature:
```js
(req, res) => { /* ... */ }
```
Example: Built-in `ignoreCORS` middleware from `server.js`.

---

## FAQ

### How does the server work?
- Loads configuration from `config.json`.
- Applies middleware functions to each request.
- If a request URL matches a configured route, serves the mapped file.
- Returns 404 for unknown routes.

### How do I add a new route?
Add a new entry to `"routes"` in `config.json`:
```json
"/about": {
  "path": "./app/about.html",
  "type": "text/html"
}
```

### How do I change server settings?
Edit the `"settings"` object in `config.json` (e.g., to enable CORS).

---

## License

MIT

---

Happy hacking! 🚀
