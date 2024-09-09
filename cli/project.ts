import * as fs from "fs";
import * as path from "path";
import * as Customizable from "./templates/allCustomizables";
/*
This detects the project status, which is largely what files are now in the user's control? (e.g. have been customized)

*/

export type Status = {
  userControlled: Set<string>;
};

export const detect = (projectSourceDir: string): Status => {
  const userControlled: Set<string> = new Set();

  for (const plugin of Customizable.all) {
    for (const genFile of plugin.all) {
      if (fs.existsSync(path.join(projectSourceDir, genFile.path))) {
        userControlled.add(genFile.path);
      }
    }
  }

  return { userControlled };
};
