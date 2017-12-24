import { getAllFiles } from "fs-i";
import * as AdmZip from "adm-zip";

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

  let zipEntries = admZip.getEntries();
  zipEntries.forEach(entry => {
    admZip.extractEntryTo(entry.entryName, targetPath);
  });
}

/**
 * 读取一个zip文件
 *
 * @export
 * @param {string} zipFile - zip 文件
 * @param {(fileName: string, buffer: Buffer) => {}} eachEntry - 文件Buffer
 */
export function readZip(zipFile: string, eachEntry: (fileName: string, buffer: Buffer) => {}) {
  let admZip = new AdmZip(zipFile);

  let zipEntries = admZip.getEntries();
  zipEntries.forEach(entry => {
    let zipEntry = admZip.getEntry(entry.entryName);
    eachEntry(zipEntry.entryName, zipEntry.getData());
  });
}
