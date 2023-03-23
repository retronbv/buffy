# Buffy ⚡
A simple proxy

## How to Use

**Installing**
```bash
npm install github:retronbv/buffy
```
(You can also use Yarn if you want)

**Importing**
```js
import Buffy from "buffy";
```

**Using**
```js
const opts = {
    url: "YOUR URL HERE" 
    /*
    A URL to proxy to. It must be a valid JavaScript URL
    https://developer.mozilla.org/docs/Web/API/URL/URL
    */
    validateStatus: (status) => status !== 404 // Optional, you should leave this out unless you know what you are doing
    /*
    `validateStatus` defines whether to call next() or send
    the proxied response for a given HTTP response status code.
    If `validateStatus` returns `true` (or is set to `null` or `undefined`),
    the proxied reponse will be sent; otherwise, next() will be called.
    */
};
const proxy = new Buffy(opts);

app.use((req, res, next) => {
    /*
    proxy.request requires 3 inputs:
    req: Request - The HTTP request
    res: Response - The HTTP response
    next: Function - A function to be called if validateStatus, well read above
    */
    proxy.request(req, res, next);
})
```

**Basic Example**
```js
const proxy = new Buffy({ url: "https://example.com" });

const server = http.createServer();

server.on("request", (req, res) => {
    proxy.request(req, res, () => {
        res.writeHead(404);
        res.end("Error");
    });
});

server.listen({ port: 8080 });
```