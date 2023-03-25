import * as path from "path";
import * as ElmPress from "./press";

ElmPress.generate({
  output: "generated",
  generators: [
    // ElmPress.app({
    //   markdown: path.join(__dirname, "../examples/elm-gql/guide"),
    //   elm: {
    //     dir: path.join(__dirname, "../examples/elm-gql/src/Page"),
    //     urls: [
    //       {
    //         page: "Home.elm",
    //         url: "/",
    //       },
    //       // {
    //       //   page: "Home.elm",
    //       //   url: "/old-homepage?{search,tag,**}",
    //       // },
    //     ],
    //   },
    // }),
    ElmPress.ui({
      colors: [],
      spacing: [],
      typography: [],
      borders: [],
      shadows: [],
    }),
    // ElmPress.figma({ apiKey: "string" }),
    // ElmPress.notion({ apiKey: "string" }),
  ],
});
