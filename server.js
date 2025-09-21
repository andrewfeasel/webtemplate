import fs from "node:fs";
import http from "node:http";
import { sendFile, ignoreCORS } from "./serverModule.js";

const configFile = fs.readFileSync("./config.json");
const config = JSON.parse(configFile.toString());

const middleware = [
  config.settings.cors ? (req, res) => undefined : ignoreCORS 
];


const server = http.createServer();
server.on("request", (req, res) => {
  for(const module of middleware) {
    module(req, res);
    if(res.writableEnded) {return}
  }
  if(Object.hasOwn(config.routes, req.url)) {
    sendFile(config.routes[req.url], res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(8080);