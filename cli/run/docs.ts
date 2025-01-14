import * as Options from "../options";
import * as Generator from "./run_generator";
import * as ElmDev from "../elm_dev";
import * as fs from "fs";
import * as path from "path";
import Chalk from "chalk";
import * as Util from "../util";
import * as Guides from "../templates/guides";

export const generator = (options: Options.Config): Options.Generator => {
  return {
    name: "docs",
    generatorType: Options.GeneratorType.DataRetrieval,
    run: async (runOptions: Options.RunOptions) => {
      // The generator is only responsible for gathering dynamic info about the project
      // e.g. collect docs.jsons stuff, and gather guides and everything.

      if (!options.docs) {
        return { generated: [] };
      }

      let elmJson: any = null;
      try {
        // Reading the *source* elm.json.
        elmJson = JSON.parse(
          fs.readFileSync(
            path.join(runOptions.root, options.docs.src, "elm.json"),
            "utf-8"
          )
        );
      } catch (e) {
        console.log(
          `I ran into an issue trying to read  ${Chalk.cyan(
            path.resolve(
              path.join(runOptions.root, options.docs.src, "elm.json")
            )
          )}`
        );
        console.log(e);
        process.exit(1);
      }

      const depDocs = await getDepDocs(elmJson.dependencies.direct);

      // @ts-ignore
      let docs = [];

      // Get module info
      let modules = options.docs ? options.docs.modules : [];
      modules = modules.concat([
        "Broadcast",
        "Listen",
        "Listen.LocalStorage",
        "Effect",
        "Effect.Clipboard",
        "Effect.Debounce",
        "Effect.Http",
        "Effect.File",
        "Effect.Nav",
        "Effect.Page",
        "Effect.Random",
        "Effect.Scroll",
      ]);

      modules = modules.concat([
        "App.Route",
        "App.Resource",
        "App.View",
        "App.Page.Error",
        "App.Page.Id",
        "App.View.Id",
      ]);

      modules.sort();

      for (const mod of modules) {
        const moduleDocs = await ElmDev.execute(`docs ${mod}`);
        // @ts-ignore
        docs = docs.concat(moduleDocs);
      }

      let readme = null;
      try {
        readme = fs.readFileSync(
          path.join(runOptions.root, "README.md"),
          "utf-8"
        );
      } catch (e) {}

      const guides: Util.File[] = [];
      for (const guidesFolder of options.docs.guides) {
        const guidesPath = path.join(runOptions.root, guidesFolder);
        if (fs.existsSync(guidesPath)) {
          await Util.readFilesRecursively(guidesPath, guides);
        }
      }
      // Add Elm Prefab Guides
      // Sort Elm Prefab Guides by key

      const sortedGuides = Object.entries(Guides.guides).sort(
        ([keyA], [keyB]) => {
          // Split paths into directory and filename parts
          const [dirA, fileA = ""] = keyA.split("/").reverse();
          const [dirB, fileB = ""] = keyB.split("/").reverse();

          // Compare directories first
          const dirCompare = (
            fileA ? keyA.slice(0, -dirA.length) : ""
          ).localeCompare(fileB ? keyB.slice(0, -dirB.length) : "");

          // If directories are the same, compare filenames
          return dirCompare !== 0 ? dirCompare : dirA.localeCompare(dirB);
        }
      );

      // Add sorted Elm Prefab Guides
      for (const [key, value] of sortedGuides) {
        guides.push({
          path: key.replace(/^[0-9_]+/, ""), // Remove leading numbers and underscores
          contents: value,
        });
      }

      const summary = await Generator.run(
        path.join(runOptions.root, ".elm-prefab"),
        {
          docs: {
            readme: readme,
            project: elmJson,
            modules: docs,
            guides,
            deps: depDocs,
          },
        }
      );
      if ("errors" in summary) {
        console.log("Errors", summary.errors);
      }

      // return Options.mergeSummaries(subsummary, summary);
      return summary;
    },
  };
};

const getDepDocs = async (deps: any) => {
  const depDocs: any = {};
  for (const [packageName, version] of Object.entries(deps)) {
    console.log(`Getting docs for ${packageName} ${version}`);
    const docs = await ElmDev.execute(`docs ${packageName} ${version}`);
    depDocs[packageName] = docs;
  }
  return depDocs;
};

// const testDocs = [
//   {
//     name: "Ui.Button",
//     comment:
//       "\n\n@docs Button\n\n@docs init, withEnabled, withSmall, withSecondary\n\n@docs view\n\n",
//     unions: [{ name: "Button", comment: " ", args: ["msg"], cases: [] }],
//     aliases: [],
//     values: [
//       {
//         name: "init",
//         comment: " ",
//         type: "{ text : String.String, onClick : msg } -> Ui.Button.Button msg",
//       },
//       {
//         name: "view",
//         comment: " ",
//         type: "Ui.Button.Button msg -> Element.Element msg",
//       },
//       {
//         name: "withEnabled",
//         comment: " ",
//         type: "Basics.Bool -> Ui.Button.Button msg -> Ui.Button.Button msg",
//       },
//       {
//         name: "withSecondary",
//         comment: " ",
//         type: "Ui.Button.Button msg -> Ui.Button.Button msg",
//       },
//       {
//         name: "withSmall",
//         comment: " ",
//         type: "Ui.Button.Button msg -> Ui.Button.Button msg",
//       },
//     ],
//     binops: [],
//   },
// ];

// const defaultDocsTheme = {
//   colors: {
//     black: "#000000",
//     white: "#ffffff",
//     grey: {
//       "50": "#fafafa",
//       "100": "#f5f5f5",
//       "200": "#e5e5e5",
//       "300": "#d4d4d4",
//       "400": "#a3a3a3",
//       "500": "#737373",
//       "600": "#525252",
//       "700": "#404040",
//       "800": "#262626",
//       "900": "#171717",
//       "950": "#0a0a0a",
//     },
//     primary: { swatch: "#6b21a8" },
//   },
//   palettes: {},
//   spacing: {
//     zero: 0,
//     sm4: 2,
//     sm3: 4,
//     sm2: 8,
//     sm: 12,
//     md: 16,
//     lg: 20,
//     lg1: 24,
//     lg2: 32,
//     lg3: 40,
//     lg4: 80,
//   },
//   typography: [
//     {
//       font: [
//         "Source Sans Pro",
//         "Trebuchet MS",
//         "Lucida Grande",
//         "Bitstream Vera Sans",
//         "Helvetica Neue",
//         "sans-serif",
//       ],
//       sizes: {
//         h1: { size: 48 },
//         h2: { size: 32 },
//         default: { size: 14 },
//       },
//     },
//   ],
//   borders: {
//     small: { rounded: 2, width: 1 },
//   },
// };

// const runAppGenerator = async (
//   runOptions: Options.RunOptions,
//   docsPath: string,
// ): Promise<Options.Summary> => {
//   const summary: Options.Summary = { generated: [] };
//   const internalSrc = path.join(docsPath, ".elm-prefab");
//   const src = path.join(docsPath, "src/app");
//   const js = path.join(docsPath, "src");
//   const status: Project.Status = Project.detect(path.join(".", src));
//   const internalOptions: Options.RunOptions = {
//     initializing: true,
//     generateDefaultFiles: true,
//     activePlugins: [],
//     project: status,
//     internalSrc,
//     js,
//     src,
//     root: docsPath,
//   };

//   // Generate a theme
//   Theme.generator(defaultDocsTheme).run(internalOptions);

//   if (!fs.existsSync(path.join(docsPath, "elm.json"))) {
//     ensureDirSync(docsPath);
// fs.writeFileSync(
//   path.join(docsPath, "elm.json"),
//   JSON.stringify(defaultDocsElmJson, null, 2),
// );
//   }

//   Static.copy(
//     {
//       initializing: true,
//       generateDefaultFiles: true,
//       activePlugins: [],
//       internalSrc,
//       js,
//       src,
//       root: docsPath,
//       project: status,
//     },
//     summary,
//   );

//   ensureDirSync(docsPath);
//   ensureDirSync(path.join(docsPath, "src"));

//   const appSummary = await App.generator({
//     pages: {
//       Home: Options.toUrl("/"),
//       Guide: Options.toUrl("/guide/*"),
//       Package: Options.toUrl("/package/*"),
//       Module: Options.toUrl("/module/*"),
//     },
//   }).run(internalOptions);

//   if (fs.existsSync(path.join(internalSrc, "Main.elm"))) {
//     fs.unlinkSync(path.join(internalSrc, "Main.elm"));
//   }

//   return Options.mergeSummaries(summary, appSummary);
// };
