import { expect } from "chai";
import "mocha";
import { zipPath, unzipPath, readZip } from "../src/index";
import { getAllFiles, getFileName } from "fs-i";
import { emptyDirSync, rmdirSync, removeSync } from "fs-extra";

describe("zipPath", function() {
  let sourcePath = `${__dirname}/testPath`;
  let zipFile = `${__dirname}/zipFile.zip`;
  let sourcePath2 = `${__dirname}/testPath2`;

  before(async () => {
    emptyDirSync(sourcePath2);
    rmdirSync(sourcePath2);

    removeSync(zipFile);
  });
  after(async () => {
    emptyDirSync(sourcePath2);
    rmdirSync(sourcePath2);

    removeSync(zipFile);
  });

  it("zipPath should be success", async () => {
    await zipPath(sourcePath, zipFile);
    await unzipPath(zipFile, sourcePath2);

    let fileList1 = await getAllFiles(sourcePath);
    let fileList2 = await getAllFiles(sourcePath2);

    expect(fileList1.length).to.be.equal(fileList2.length);
    for (let i = 0; i < fileList1.length; i++) {
      let file1 = getFileName(fileList1[i]);
      let file2 = getFileName(fileList2[i]);
      expect(file1).to.be.equal(file2);
    }
  });

  it("readZip should be success", async () => {
    let fileList2 = await getAllFiles(sourcePath2);
    let fileList1: string[] = [];
    await readZip(zipFile, (fileName, buffer) => {
      fileList1.push(fileName);
    });

    for (let i = 0; i < fileList1.length; i++) {
      let file1 = getFileName(fileList1[i]);
      let file2 = getFileName(fileList2[i]);
      expect(file1).to.be.equal(file2);
    }
  });
});
