import { getAllFiles, existsSync, mkdirsSync } from "fs-i";
import * as AdmZip from "adm-zip";
import * as fs from "fs";
import * as path from "path";

/**
 * 压缩目录及子目录成zip文件
 *
 * @export
 * @param {string} sourcePath - 目录
 * @param {string} zipFile - zip文件
 */
export async function zipPath(sourcePath: string, zipFile: string) {
  let admZip = new AdmZip();

  sourcePath = sourcePath.replace(/\\/g, "/").replace(/\/$/g, "") + "/";

  let fileList = await getAllFiles(sourcePath);

  fileList.map(file => {
    let subPathFileName = file.substr(sourcePath.length).replace(/\\/g, "/");
    let lastPIndex = subPathFileName.lastIndexOf("/");
    let subPath = subPathFileName.substr(0, lastPIndex);
    let fileName = subPathFileName.substr(lastPIndex + 1);
    admZip.addLocalFile(file, subPath);
  });
  admZip.writeZip(zipFile);
}

/**
 * 解压zip文件
 *
 * @export
 * @param {string} zipFile - zip 文件
 * @param {string} targetPath - 目标目录
 */
export async function unzipPath(zipFile: string, targetPath: string) {
  let admZip = new AdmZip(zipFile);

  // let zipEntries = admZip.getEntries();
  // zipEntries.forEach(entry => {
  //   admZip.extractEntryTo(entry.entryName, targetPath, false, true);
  // });

  admZip.extractAllTo(targetPath, true);
}

/**
 * 读取一个zip文件
 *
 * @export
 * @param {string} zipFile - zip 文件
 * @param {(fileName: string, buffer: Buffer) => {}} eachEntry - 文件Buffer
 */
export async function readZip(zipFile: string, eachEntry: (fileName: string, buffer: Buffer) => void) {
  return new Promise((resolve, reject) => {
    let admZip = new AdmZip(zipFile);

    let zipEntries = admZip.getEntries();
    zipEntries.forEach((entry, index, array) => {
      let zipEntry = admZip.getEntry(entry.entryName);
      eachEntry(zipEntry.entryName, zipEntry.getData());

      if (index == array.length - 1) {
        resolve();
      }
    });
  });
}
