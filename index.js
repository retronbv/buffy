// Here we import fun stuffs
const express = require("express");
const fetch = require("node-fetch");
const kuler = require('kuler');
const app = express();

const proxyUrl = "3kh0.github.io"
app.get("/*", async (req, res) => {
  const proxied = await fetch("https://" + proxyUrl + req.url);
  const mime = proxied.headers.get("content-type");
  //console.log(mime.split(";")[0].split("/")[0])
  if (mime.split(";")[0].split("/")[0] == "image") {
    const image = proxied.body;
    res.set("Content-Type",mime.split(";")[0])
    res.send(image);

  } else {
    //console.log("Mime: " + mime);
    res.set("Content-Type",mime.split(";")[0])
    const html = await proxied.text();
    res.send(html)
  }
});

// Here we start the app no shit
app.listen(3000, () => {
  console.log(kuler('Server has been started! Listening on port 3000', '#00ff00'));
  console.log(kuler('Proxying the domain: ' + proxyUrl, '#00ffdd'));
  console.log("Link to view: " + kuler(`https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`, '#0000ff'));

});