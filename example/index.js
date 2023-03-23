import http from "node:http";
import connect from "connect";
import Buffy from "../index.js"; // Load Buffy
import kuler from "kuler"; // Console colors

console.log(`
██████╗ ██╗   ██╗███████╗███████╗██╗   ██╗
██╔══██╗██║   ██║██╔════╝██╔════╝╚██╗ ██╔╝
██████╔╝██║   ██║█████╗  █████╗   ╚████╔╝ 
██╔══██╗██║   ██║██╔══╝  ██╔══╝    ╚██╔╝  
██████╔╝╚██████╔╝██║     ██║        ██║   
╚═════╝  ╚═════╝ ╚═╝     ╚═╝        ╚═╝                                          
`);

const url = "https://3kh0.github.io";

console.log(kuler(`Proxying the domain: ${url}`, "#00ffdd"));

const proxy = new Buffy({
    url: url,
    validateStatus: () => true
});
const app = connect();
const server = http.createServer();
const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
    proxy.request(req, res, next);
});

app.use((req, res) => {
    res.writeHead(500);
    res.end("Error");
});

server.on("request", app);

server.on("listening", () => {
    console.log(kuler(`Server has been started! Listening on port ${PORT}`, "#00ff00"));
    console.log("Link to view (Replit): " + kuler(`https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`, "#0000ff"));
});

// Here we start the server
server.listen({ port: PORT })