// Here we import fun stuffs
const express = require("express");
const fetch = require("node-fetch");
const kuler = require('kuler');
const app = express();

const proxyUrl = "3kh0.github.io"
console.log(kuler('Proxying the domain: ' + proxyUrl, '#00ffdd'));
app.get("/*", async (req, res) => {
  const proxied = await fetch("https://" + proxyUrl + req.url);
  const mime = proxied.headers.get("content-type");
  res.set("Content-Type",mime.split(";")[0])
  const body = proxied.body
  res.status(200);
  res.write(body); // ERR_INVALID_ARG_TYPE 15:7
  res.end();
});

// Here we start the proxy
app.listen(3000, () => {
  console.log(kuler('Server has been started! Listening on port 3000', '#00ff00'));
  console.log("Link to view: " + kuler(`https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`, '#0000ff'));

});