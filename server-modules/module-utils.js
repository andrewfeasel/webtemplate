import fs from "node:fs";

export function sendFile(fileObj, res){
  res.setHeader("Content-Type", fileObj.type);
  res.writeHead(200);

  const fileStream = fs.createReadStream(fileObj.path);
  fileStream.on("error", () => {
    res.writeHead(500);
    res.end();
  });
  fileStream.pipe(res);
}

export async function getPostData(req) {
  const postbuf = [];
  for await(const chunk of req) {
    postbuf.push(chunk);
  }
  return Buffer.concat(postbuf);
}
