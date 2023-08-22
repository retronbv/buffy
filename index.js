import http from "node:http";
import fetch from "node-fetch"; // How we are actually proxying the assets
import kuler from "kuler"; // Console colors
import contentType from "content-type"; // Get the MIME type of the asset
import { hostname } from "node:os"; // Computer's hostname

console.log(`
██████╗ ██╗   ██╗███████╗███████╗██╗   ██╗
██╔══██╗██║   ██║██╔════╝██╔════╝╚██╗ ██╔╝
██████╔╝██║   ██║█████╗  █████╗   ╚████╔╝ 
██╔══██╗██║   ██║██╔══╝  ██╔══╝    ╚██╔╝  
██████╔╝╚██████╔╝██║     ██║        ██║   
╚═════╝  ╚═════╝ ╚═╝     ╚═╝        ╚═╝                                          
`);

const server = http.createServer();
const url = "https://3kh0.github.io";
const PORT = process.env.PORT || 8080;

server.on("request", async (req, res) => {
  const asset_url = new URL(url + req.url);
  const asset = await fetch(`${asset_url.origin}${asset_url.pathname}`); // Get the asset from the website
  res.writeHead(asset.status, {
    "Content-Type": contentType.parse(asset.headers.get("content-type")).type,
  }); // Send the HTTP status code set the MIME type
  res.end(Buffer.from(await asset.arrayBuffer())); // Write the asset to the response
});

server.on("listening", () => {
  console.log(
    kuler(`Server has been started! Listening on port ${PORT}`, "#00ff00"),
  );
  if (process.env.REPL_SLUG && process.env.REPL_OWNER)
    console.log(
      "Link to view: " +
        kuler(
          `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`,
          "#0000ff",
        ),
    );
  else {
    console.log(
      kuler(`Links to view: http://${hostname()}:${PORT}`, "#0000ff"),
    );
    console.log(kuler(`              http://127.0.0.1:${PORT}`, "#0000ff"));
    console.log(kuler(`              http://0.0.0.0:${PORT}`, "#0000ff"));
  }
});

// Here we start the proxy
server.listen({ port: PORT });
