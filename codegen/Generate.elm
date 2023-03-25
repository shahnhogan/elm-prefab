module Generate exposing (main)

{-| -}

import Elm
import Elm.Annotation as Type
import Gen.CodeGen.Generate as Generate
import Json.Decode
import Path
import Press.Generate
import Theme


main : Program Json.Decode.Value () ()
main =
    Generate.fromJson
        Press.Generate.decode
        Press.Generate.generate
