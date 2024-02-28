import { isFolderExsit } from "./isFolderExist";
import fs from "fs";
import OS from "os";

/**
 * 创建深层级目录
 * @param path 绝对路径
 * @returns
 */

export async function createDirecotry(path: string) {
  if (OS.platform() === "win32") {
    path = path.replace(/\\/g, "/");
  }

  const reg = /^(([./ | /])+)[\w]+/;

  if (reg.test(path)) {
    return false;
  }

  if (await isFolderExsit(path)) {
    return true;
  }

  const parts = path.split("/");
  let str = "";
  for (let i = 0; i < parts.length; i++) {
    str += parts[i] + "/";
    const result = await isFolderExsit(str);

    if (result) {
      // 文件夹存在
      continue;
    }

    fs.mkdir(str, (err) => {
      if (err) {
        console.log(err);
        return false;
      }
    });
  }

  return true;
}
