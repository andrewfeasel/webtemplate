import fs from "node:fs";
import http from "node:http";

var routes;
fs.readFile("./routes.json", (err, data) => {
  if(err) throw err;
  routes = JSON.parse(data.toString("utf8"));
});

function serve(fileObj, res){
  res.setHeader("Content-Type", fileObj.type);
  res.writeHead(200);

  fs.readFile(fileObj.path, (err, data) => {
    if(err) throw err;
    res.write(data);
    res.end();
  });
}

function requestHandler(req, res) {
  if(Object.hasOwn(routes, req.url)) {
    serve(routes[req.url], res);
  } else {
    res.writeHead(404);
    res.end();
  }
}

var server = new http.Server();
server.on("request", requestHandler);
server.listen(8080);
