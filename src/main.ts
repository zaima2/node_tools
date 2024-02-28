import { createFileMap } from "./utils/createFileMap";
import path from "path";
import { createLog } from "./utils/log";

async function init() {
  //   const rootPath = path.resolve(__dirname, "./test");
  const desPath = path.resolve(__dirname, "./logs");
  await createLog(desPath, "testtest");
  //   await createFileMap(rootPath, desPath);
}

init();
