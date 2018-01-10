import { ProjectConfigModel } from "pcreate-config";

let projectConfig: ProjectConfigModel = {
  projectType: "node",
  compile: {
    outDir: "./es/",
    module: "commonjs",
    target: "ES2016",
    lib: ["es5", "es2015.promise"],
    declaration: true
  },
  command: false,
  documents: true,
  unitTest: true,
  sourceInclude: ["./src/**/*"]
};

export default projectConfig;
