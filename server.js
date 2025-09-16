import fs from "node:fs/promises";
import http from "node:http";

async function getRoutes(){
  const routesFile = await fs.readFile("./routes.json");
  return JSON.parse(routesFile.toString())
}

async function sendFile(fileObj, res){
  res.setHeader("Content-Type", fileObj.type);
  res.writeHead(200);

  const resFile = await fs.readFile(fileObj.path);
  res.write(resFile);
  res.end();
}

async function getPostData(req) {
  const postbuf = [];
  for await(const chunk of req) {
    postbuf.push(chunk);
  }
  return postbuf;
}

var routes = await getRoutes();
var server = new http.Server();

server.on("request", (req, res) => {
  if(Object.hasOwn(routes, req.url)) {
    sendFile(routes[req.url], res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(8080);
