import dateFormat from "dateformat";
import * as fs from "fs";
import { Parser } from "json2csv";

const outputDirPath = __dirname + "/../.output/";
const fields = ["href", "heroImg", "headStr"];

export const initCSV = (data: any) => {
  const json2csvParser = new Parser<any>({ fields });
  return json2csvParser.parse(data);
};

export const initCSVCMS = (data: any) => {
  const fields = ["id", "contentText"]
  const json2csvParser = new Parser<any>({ fields });
  return json2csvParser.parse(data);
};

export const parseCSV = (data: any) => {
  const json2csvParser = new Parser<any>({ fields, header: false });
  return json2csvParser.parse(data);
};

export const createFile = (data: string, filename: string) => {
  const filePath = outputDirPath + filename;

  fs.writeFile(filePath, data, (err) => {
    // ディレクトリ作成できなかったとき
    if (err && err.code === "ENOENT") {
      // ディレクトリ部分だけ切り取り
      const dir = filePath.substring(0, filePath.lastIndexOf("/"));

      // 親ディレクトリ作成
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) throw err;
        createFile(data, filename);
      });
      return;
    }
    console.log("created");
  });
};

export const appendFile = (data: string, filename: string) => {
  fs.appendFile(outputDirPath + filename, "\r\n" + data, (error) => {
    if (error) {
      throw error;
    } else {
    }
  });
};

export const deleteFile = (filename: string) =>
  fs.unlink(outputDirPath + filename, (error) => {
    if (error) throw error;
  });

export const createUniquename = (name: string): string => {
  const now = dateFormat(new Date(), "yyyymmddHHMMss");
  const filename = `${name}-${now}.csv`;
  return filename;
};

export const renameFile = (baseName: string, newName: string) => {
  fs.rename(outputDirPath + baseName, outputDirPath + newName, (err) => {
    if (err) throw err;
  });
};

export const memoryUsageLog = () => {
  const used = process.memoryUsage();
  const messages = [];
  messages.push(`rss: ${Math.round((used.rss / 1024 / 1024) * 100) / 100} MB`);
  messages.push(`heapTotal: ${Math.round((used.heapTotal / 1024 / 1024) * 100) / 100} MB`);
  messages.push(`heapUsed: ${Math.round((used.heapUsed / 1024 / 1024) * 100) / 100} MB`);
  messages.push(`external: ${Math.round((used.external / 1024 / 1024) * 100) / 100} MB`);
  messages.push(`arrayBuffers: ${Math.round((used.arrayBuffers / 1024 / 1024) * 100) / 100} MB`);
};
