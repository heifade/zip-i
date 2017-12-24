import { zipPath, unzipPath } from "./zipPath";

let sourcePath = "/Volumes/RamDisk/Github/test1";
let sourcePath2 = "/Volumes/RamDisk/Github/test2";
let zipFile = "/Volumes/RamDisk/Github/test11.zip";

zipPath(sourcePath, zipFile)
  .then(() => {
    unzipPath(zipFile, sourcePath2)
      .then()
      .catch();
  })
  .catch(err => {});
