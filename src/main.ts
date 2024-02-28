import { createFileMap } from "./utils/createFileMap";
import path from "path";

async function init() {
  const rootPath = path.resolve(__dirname, "./test");
  const desPath = path.resolve(__dirname, "./tmp");
  await createFileMap(rootPath, desPath);
}

init();
