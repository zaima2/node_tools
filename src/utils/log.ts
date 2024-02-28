import { createDirecotry } from "./createDirectory";
import { isFolderExsit } from "./isFolderExist";
import fs from "fs";
import { resolve } from "path";
import OS from "os";

interface LogOption {}

function fetchRawDay(date: number | string) {
  const currentDay = new Date(+date);
  const originYear = currentDay.getFullYear();
  const originMonth = currentDay.getMonth() + 1;
  const originDay = currentDay.getDate();
  return {
    year: originYear,
    month: originMonth,
    day: originDay,
  };
}

function fetchSpecifyLogPath(date: string | number, paths: string[]) {
  const origin = fetchRawDay(date);

  for (let i = 0; i < paths.length; i++) {
    const arr = paths[i].split(".log");
    const cur = arr[0];
    const curDate = fetchRawDay(cur);

    if (
      curDate.year === origin.year &&
      curDate.month === curDate.month &&
      curDate.day === origin.day
    ) {
      return paths[i];
    }
  }
  return null;
}

/**
 * 创建日志文件
 * @param des 创建日志文件目标目录
 * @param option 创建日志选项
 */

export async function createLog(des: string, msg: string, option?: LogOption) {
  const check = await isFolderExsit(des);
  if (!check) {
    // 如果目标目录不存在
    await createDirecotry(des);
  }

  const files = await fs.readdirSync(des);

  const findCurrentDateLogFilePath = await fetchSpecifyLogPath(
    new Date().getTime(),
    files
  );

  let tarPath = "";

  if (!findCurrentDateLogFilePath) {
    // 不存在当天的日志文件
    const curDate = Date.now();
    tarPath = curDate + ".log";
  } else {
    tarPath = findCurrentDateLogFilePath;
  }

  const content = `[${new Date()}] ${msg}` + OS.EOL;

  await fs.writeFileSync(resolve(des, tarPath), content, {
    flag: "a",
  });

  return true;

  //  fs.wri
}
