import fs from "fs";
import path from "path";
import OS from "os";

/**
 * 创建文件地图,参数必须为绝对路径
 * @param root 文件夹根路径
 * @param des 地图生成位置
 */

import { createDirecotry } from "./createDirectory";
import { isFolderExsit } from "./isFolderExist";

export async function createFileMap(root: string, des: string) {
  const checkRootDir = await isFolderExsit(root);

  if (!checkRootDir) {
    return;
  }

  const checkDesDir = await isFolderExsit(des);

  if (!checkDesDir) {
    // 生成地图目标位置目录不存在
    await createDirecotry(des);
  }

  const rootDir = await fs.readdirSync(root);

  for (let i = 0; i < rootDir.length; i++) {
    if (await isFolderExsit(path.resolve(root, rootDir[i]))) {
      // 文件夹
      createFileMap(path.resolve(root, rootDir[i]), des);
      continue;
    }

    // 文件

    const content = {
      filename: rootDir[i],
      path: path.resolve(root, rootDir[i]),
    };

    fs.writeFileSync(
      path.resolve(des, "file.map.txt"),
      JSON.stringify(content) + OS.EOL,
      {
        flag: "a",
      }
    );

    // const state = await (path.resolve(root, rootDir[i]));
    // console.log(state);
  }
}
