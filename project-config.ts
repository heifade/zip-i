import { ProjectConfigModel } from "pcreate-config";

let projectConfig: ProjectConfigModel = {
  projectType: "node",
  compile: {
    outDir: "./es/",
    module: "commonjs",
    target: "ESNEXT",
    declaration: true
  },
  command: true,
  documents: true,
  unitTest: true
};

export default projectConfig;
