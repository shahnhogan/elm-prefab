module Effect.Clipboard exposing (copy)

{-| Copy a value to the clipboard
-}

import Effect
import Json.Encode as Json


port clipboard : Json.Value -> Cmd msg


copy : String -> Effect.Effect msg
copy text =
    Effect.SendToWorld
        { toPort = clipboard
        , portName = "clipboard"
        , payload =
            Json.string text
        }
