import { defineConfig } from "vite";
import elmPlugin from "vite-plugin-elm";

function elmPrefabPlugin() {
  return {
    name: "vite-plugin-elm-prefab",
    configureServer(server) {
      server.watcher.on("change", (file) => {
        if (
          path.basename(file) === "elm.generate.json" ||
          path.extname(file) == ".gql" ||
          path.extname(file) == ".graphql"
        ) {
          console.log("Elm Prefab refreshing...");

          const elmPrefab = spawn("elm-prefab", [], { shell: true });

          elmPrefab.stdout.on("data", (data) => {
            console.log(`elm-prefab output: ${data}`);
          });

          elmPrefab.stderr.on("data", (data) => {
            console.error(`elm-prefab error: ${data}`);
          });

          elmPrefab.on("close", (code) => {
            if (code === 0) {
              // Trigger a reload after successful elm-prefab execution
              server.ws.send({ type: "full-reload" });
            }
          });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const isDev = mode == "development";
  return {
    clearScreen: false,
    server: {
      strictPort: true,
    },

    build: {
      minify: "esbuild",
      outDir: "../dist",
    },
    root: "src",
    plugins: [
      elmPrefabPlugin(),
      elmPlugin({
        debug: isDev,
        optimize: !isDev,
      }),
    ],
  };
});
