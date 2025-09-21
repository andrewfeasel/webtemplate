import fs from "node:fs";
import http from "node:http";

function getRoutes(){
  const routesFile = fs.readFileSync("./routes.json");
  return JSON.parse(routesFile.toString())
}

async function sendFile(fileObj, res){
  res.setHeader("Content-Type", fileObj.type);
  res.writeHead(200);

  const fileStream = fs.createReadStream(fileObj.path);
  fileStream.pipe(res);
}

function ignoreCORS(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
}

async function getPostData(req) {
  const postbuf = [];
  for await(const chunk of req) {
    postbuf.push(chunk);
  }
  return postbuf;
}

const routes = getRoutes();
const server = new http.Server();

server.on("request", (req, res) => {
  ignoreCORS(req, res);
  if(Object.hasOwn(routes, req.url)) {
    sendFile(routes[req.url], res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(8080);
