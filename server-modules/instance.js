import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { sendFile } from "./module-utils.js";

const configFile = await readFile("./config.json");
const config = JSON.parse(configFile.toString());

function staticResponse(req, res) {
  if(Object.hasOwn(config.routes, req.url)) {
    sendFile(config.routes[req.url], res);
  } else {
    res.writeHead(404);
    res.end();
  }
}

function ignoreCORS(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
  }
}

const middleware = [
  config.settings.cors ? () => {} : ignoreCORS,
  staticResponse
];

export default async function() {
  const server = createServer();
  server.on("request", async (req, res) => {
    for(const module of middleware) {
      if(res.writableEnded) break;
      await Promise.resolve(module(req, res));
    }
  });
  server.listen(config.settings?.port ?? 8080);
}
