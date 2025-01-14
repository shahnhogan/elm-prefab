
import * as path from "path";
import * as fs from "fs";
import * as Options from "../../options";


export const Asset_FrontMatter = {
   moduleName: "Asset.FrontMatter",
   path: "/Asset/FrontMatter.elm",
   contents: "module Asset.FrontMatter exposing (parse, parseOrFail)\n\nimport Dict exposing (Dict)\nimport Parser exposing ((|.), (|=))\n\n\n{-| Parse the frontmatter of a Markdown file\n-}\nparse :\n    String\n    ->\n        { attrs : Dict String String\n        , body : String\n        }\nparse input =\n    case Parser.run frontMatter input of\n        Ok result ->\n            result\n\n        Err err ->\n            { attrs = Dict.empty\n            , body = input\n            }\n\n\n{-| -}\nparseOrFail :\n    String\n    ->\n        Result\n            (List Parser.DeadEnd)\n            { attrs : Dict String String\n            , body : String\n            }\nparseOrFail input =\n    Parser.run frontMatter input\n\n\n{-| Parses a block of frontmatter into a dictionary of keys and their multiline values.\n-}\nfrontMatter : Parser.Parser { attrs : Dict String String, body : String }\nfrontMatter =\n    Parser.succeed\n        (\\attrs markdown ->\n            { attrs = attrs\n            , body = markdown\n            }\n        )\n        |. Parser.spaces\n        |= Parser.loop ( Dict.empty, Nothing )\n            frontMatterItem\n        |= Parser.getChompedString\n            (Parser.chompWhile (\\_ -> True))\n\n\ntype alias Cursor =\n    ( String, String )\n\n\ntype KeyOrContent\n    = Key String\n    | Content String\n\n\nkeyOrContent : Parser.Parser KeyOrContent\nkeyOrContent =\n    Parser.succeed\n        (\\first str isKey ->\n            if isKey then\n                Key (String.trim (first ++ str))\n\n            else\n                Content (first ++ str)\n        )\n        |= Parser.getChompedString\n            (Parser.chompIf\n                (\\char ->\n                    (char /= ':')\n                        && (char /= '\\n')\n                )\n            )\n        |= Parser.getChompedString\n            (Parser.chompWhile\n                (\\char ->\n                    (char /= ':')\n                        && (char /= '\\n')\n                )\n            )\n        |= Parser.oneOf\n            [ Parser.succeed True\n                |. Parser.chompIf (\\char -> char == ':')\n            , Parser.succeed False\n            ]\n        |. Parser.chompWhile (\\char -> char == ' ')\n        |. Parser.chompWhile (\\char -> char == '\\n')\n\n\n{-| Parses a block of frontmatter into a dictionary of keys and their multiline values.\n-}\nfrontMatterItem : ( Dict String String, Maybe Cursor ) -> Parser.Parser (Parser.Step ( Dict String String, Maybe Cursor ) (Dict String String))\nfrontMatterItem ( captured, maybeCursor ) =\n    Parser.oneOf\n        [ Parser.succeed (Parser.Done captured)\n            |. Parser.oneOf\n                [ Parser.end\n                , Parser.succeed ()\n                    |. Parser.chompIf (\\char -> char == '-')\n                    |. Parser.chompWhile (\\char -> char == '-')\n                    |. Parser.chompWhile (\\char -> char == '\\n')\n                ]\n        , Parser.succeed\n            (\\keyOrContentWhoKnows value ->\n                case keyOrContentWhoKnows of\n                    Key key ->\n                        Parser.Loop ( Dict.insert key value captured, Just ( key, value ) )\n\n                    Content startingContent ->\n                        case maybeCursor of\n                            Just ( key, content ) ->\n                                Parser.Loop\n                                    ( Dict.insert key (content ++ \"\\n\" ++ startingContent) captured\n                                    , Just ( key, value )\n                                    )\n\n                            Nothing ->\n                                Parser.Loop ( captured, maybeCursor )\n            )\n            |= keyOrContent\n            |= Parser.getChompedString\n                (Parser.chompWhile (\\char -> char /= '\\n'))\n            |. Parser.chompWhile (\\char -> char == '\\n')\n        , --\n          Parser.succeed (Parser.Done captured)\n        ]\n"
}

export const all = [
  Asset_FrontMatter
]

export const copyTo = (baseDir: string, overwrite: boolean, skip: boolean, summary: Options.Summary) => {
   for (const file of all) {
      if (overwrite || (!fs.existsSync(path.join(baseDir, file.path)) && !skip)) {
        const filepath = path.join(baseDir, file.path);
        fs.mkdirSync(path.dirname(filepath), { recursive: true });
        fs.writeFileSync(filepath, file.contents);
        const generated = { outputDir: baseDir, path: filepath}
        Options.addGenerated(summary, generated);
      }
   }
}
