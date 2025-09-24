import os from "node:os";
import cluster from "node:cluster";

if(cluster.isPrimary) {
  os.cpus().forEach(() => cluster.fork());
  process.on("SIGINT", () => {
    for(const instance of Object.values(cluster.workers)) { instance.kill(); }
    process.exit();
  })
} else {
  const instance = await import("./server-modules/instance.js");
  await instance.default();
}