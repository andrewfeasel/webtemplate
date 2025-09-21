import fs from "node:fs";

export function sendFile(fileObj, res){
  res.setHeader("Content-Type", fileObj.type);
  res.writeHead(200);

  const fileStream = fs.createReadStream(fileObj.path);
  fileStream.pipe(res);
}

export function ignoreCORS(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
}

export async function getPostData(req) {
  const postbuf = [];
  for await(const chunk of req) {
    postbuf.push(chunk);
  }
  return Buffer.concat(postbuf);
}