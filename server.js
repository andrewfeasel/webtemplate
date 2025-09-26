import os from "node:os";
import cluster from "node:cluster";

import fs from "node:fs/promises";
import http from "node:http";

import { sendFile } from "./server-modules/module-utils.js";

if(cluster.isPrimary) {
  const cpuCount = os.cpus().length;
  for(let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
  process.on("SIGINT", () => {
    for(const instance of Object.values(cluster.workers)) { instance.kill(); }
    process.exit();
  });
} else {
  const configFile = await fs.readFile("./config.json");
  const config = Object.freeze(JSON.parse(configFile.toString()));

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
    config.settings.cors ? (req, res) => {} : ignoreCORS,
    staticResponse
  ];

  const server = http.createServer();
  server.on("request", async (req, res) => {
    const middlewareCount = middleware.length;
    for(let i = 0; i < middlewareCount; i++) {
      if(res.writableEnded) break;
      await Promise.resolve(middleware[i](req, res));
    }
    });
  server.listen(config.settings.port);
}
