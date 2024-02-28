import fs from "fs";

/**
 * 判断文件夹是否存在
 * @param path 路径
 */

export async function isFolderExsit(path: string) {
  try {
    await fs.readdirSync(path);
    return true;
  } catch {
    return false;
  }
}
