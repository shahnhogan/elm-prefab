
import * as path from "path";
import * as fs from "fs";
import * as Options from "../../options";

export const copyTo = (baseDir: string, overwrite: boolean, summary: Options.Summary) => { 
  
  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/Effect/LocalStorage.elm"))) {
    const filepath = path.join(baseDir, "/App/Effect/LocalStorage.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module App.Effect.LocalStorage exposing\n    ( LocalStorage\n    , saveSession, clearSession, onSessionChange\n    , decode\n    )\n\n{-| A very simple module for interacting with local storage.\n\nThis pairs with some js code in localStorage.ts!\n\n@docs LocalStorage\n\n@docs saveSession, clearSession, onSessionChange\n\n@docs decode\n\n-}\n\nimport App.Effect\nimport App.Shared\nimport App.Sub\nimport Json.Decode\nimport Json.Encode\n\n\ntype alias LocalStorage =\n    { session : Maybe Session\n    }\n\n\ntype alias Session =\n    { token : String\n    }\n\n\nkeys =\n    { session = \"session\"\n    }\n\n\ndecode : Json.Decode.Decoder LocalStorage\ndecode =\n    -- All tables must fail nicely\n    Json.Decode.map LocalStorage\n        (Json.Decode.maybe (Json.Decode.field keys.session decodeSession))\n\n\n\n-- Session helpers\n\n\nsaveSession : Session -> App.Effect.Effect msg\nsaveSession session =\n    saveToLocalStorage\n        keys.session\n        (encodeSession session)\n\n\nclearSession : App.Effect.Effect msg\nclearSession =\n    clearAtKey keys.session\n\n\nonSessionChange : (Session -> msg) -> App.Sub.Sub msg\nonSessionChange toMsg =\n    App.Sub.onLocalStorageUpdated\n        { key = keys.session\n        , decoder = Json.Decode.map toMsg decodeSession\n        }\n\n\ndecodeSession : Json.Decode.Decoder Session\ndecodeSession =\n    Json.Decode.map\n        (\\token -> { token = token })\n        (Json.Decode.field \"token\" Json.Decode.string)\n\n\nencodeSession : Session -> Json.Encode.Value\nencodeSession session =\n    Json.Encode.object\n        [ ( \"token\", Json.Encode.string session.token )\n        ]\n\n\n\n-- Lower level helpers\n\n\n{-| Sends a message out the `outgoing` port that is defined in `App.Effect`.\n\nYou can see where this ends up on the JS side of things in `js/ports.js`.\n\n-}\nsaveToLocalStorage : String -> Json.Encode.Value -> App.Effect.Effect msg\nsaveToLocalStorage key value =\n    App.Effect.sendToJs\n        { tag = \"local-storage\"\n        , details =\n            Just\n                (Json.Encode.object\n                    [ ( \"key\", Json.Encode.string key )\n                    , ( \"value\", value )\n                    ]\n                )\n        }\n\n\nclearAtKey : String -> App.Effect.Effect msg\nclearAtKey key =\n    App.Effect.sendToJs\n        { tag = \"local-storage-clear\"\n        , details =\n            Just\n                (Json.Encode.object\n                    [ ( \"key\", Json.Encode.string key )\n                    ]\n                )\n        }\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/Page/Error.elm"))) {
    const filepath = path.join(baseDir, "/App/Page/Error.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module App.Page.Error exposing (Error(..))\n\n{-| You may want to protect a page with a certain error when it is first requested.\n\n  - `NotFound` is built in to `elm-prefab`, so you don't need to capture that here.\n\nCommon errors are\n\n    - Unauthenticated — When you require someone to be signed in in order to see a page.\n    - Permission denied — When you require taht someone is both signed in and has certain permissions.\n\n-}\n\n\ntype Error\n    = Unauthenticated\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/Page/Id.elm"))) {
    const filepath = path.join(baseDir, "/App/Page/Id.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module App.Page.Id exposing (Id(..))\n\n{-| -}\n\n\ntype Id\n    = Home HomeParams\n\n\n\n{- Param definitions -}\n\n\ntype alias HomeParams =\n    {}\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/Effect.elm"))) {
    const filepath = path.join(baseDir, "/App/Effect.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "port module App.Effect exposing\n    ( Effect, none, batch, map\n    , now, nowAfter\n    , navigateTo, pushUrl, replaceUrl\n    , forward, back\n    , preload, load, loadAt, reload\n    , sendMsg, sendMsgAfter\n    , generate\n    , focus, blur\n    , file, files, fileToUrl\n    , copyToClipboard\n    , request, Expect, expectString, expectJson, expectBytes, expectWhatever\n    , toCmd, sendToJs\n    )\n\n{-|\n\n@docs Effect, none, batch, map\n\n\n# Time\n\n@docs now, nowAfter\n\n\n# Navigation\n\n@docs navigateTo, pushUrl, replaceUrl\n\n@docs forward, back\n\n\n# Loading\n\n@docs preload, load, loadAt, reload\n\n\n# Callbacks\n\n@docs sendMsg, sendMsgAfter\n\n\n# Random generation\n\n@docs generate\n\n\n# Browser focus\n\n@docs focus, blur\n\n\n# File selection\n\n@docs file, files, fileToUrl\n\n\n# Clipboard\n\n@docs copyToClipboard\n\n\n# Http\n\n@docs request, Expect, expectString, expectJson, expectBytes, expectWhatever\n\n\n# Effects\n\n@docs toCmd, sendToJs\n\n-}\n\nimport App.Page.Id\nimport App.Route\nimport App.View.Id\nimport Browser\nimport Browser.Dom\nimport Browser.Navigation\nimport Bytes\nimport Bytes.Decode\nimport File\nimport File.Select\nimport Html\nimport Http\nimport Json.Decode\nimport Json.Encode\nimport Process\nimport Random\nimport Task\nimport Time\n\n\nnone : Effect msg\nnone =\n    None\n\n\nbatch : List (Effect msg) -> Effect msg\nbatch =\n    Batch\n\n\n{-| -}\nnavigateTo : App.Route.Route -> Effect msg\nnavigateTo route =\n    PushUrl (App.Route.toString route)\n\n\n{-| -}\npushUrl : String -> Effect msg\npushUrl =\n    PushUrl\n\n\n{-| -}\nreplaceUrl : String -> Effect msg\nreplaceUrl =\n    ReplaceUrl\n\n\n{-| -}\nload : String -> Effect msg\nload =\n    Load\n\n\n{-| -}\nloadAt : App.View.Id.Region -> App.Page.Id.Id -> Effect msg\nloadAt region pageId =\n    ViewUpdated (App.View.Id.Push region pageId)\n\n\nclear : App.View.Id.Region -> Effect msg\nclear region =\n    ViewUpdated (App.View.Id.ClearRegion region)\n\n\npreload : App.Page.Id.Id -> Effect msg\npreload =\n    Preload\n\n\nreload : Effect msg\nreload =\n    Reload\n\n\nforward : Int -> Effect msg\nforward =\n    Forward\n\n\nback : Int -> Effect msg\nback =\n    Back\n\n\nsendMsg : msg -> Effect msg\nsendMsg =\n    SendMsg\n\n\nsendMsgAfter : Int -> msg -> Effect msg\nsendMsgAfter delay msg =\n    SendMsgAfter delay msg\n\n\n{-| -}\nsendToJs : { tag : String, details : Maybe Json.Encode.Value } -> Effect msg\nsendToJs =\n    SendToWorld\n\n\n{-| Get the current time\n-}\nnow : (Time.Posix -> msg) -> Effect msg\nnow =\n    Now Nothing\n\n\n{-| Delay for some number of milliseconds, then get the current time\n-}\nnowAfter : Float -> (Time.Posix -> msg) -> Effect msg\nnowAfter wait =\n    Now (Just wait)\n\n\n{-| Attempt to change the browser focus to the element with a given id.\n-}\nfocus : String -> (Result Browser.Dom.Error () -> msg) -> Effect msg\nfocus =\n    Focus\n\n\n{-| Make a specific element lose focus.\n-}\nblur : String -> (Result Browser.Dom.Error () -> msg) -> Effect msg\nblur =\n    Blur\n\n\n{-| Run a random generator to produce a value.\n-}\ngenerate : (item -> msg) -> Random.Generator item -> Effect msg\ngenerate fn generator =\n    Generate (Random.map fn generator)\n\n\n{-| -}\nfile : List String -> (File.File -> msg) -> Effect msg\nfile =\n    File\n\n\nfiles : List String -> (File.File -> List File.File -> msg) -> Effect msg\nfiles =\n    Files\n\n\nfileToUrl : File.File -> (String -> msg) -> Effect msg\nfileToUrl fileData toMsg =\n    FileToUrl fileData toMsg\n\n\ncopyToClipboard : String -> Effect msg\ncopyToClipboard text =\n    SendToWorld\n        { tag = \"copy-to-clipboard\"\n        , details = Just (Json.Encode.string text)\n        }\n\n\nrequest :\n    { method : String\n    , headers : List Http.Header\n    , url : String\n    , body : Http.Body\n    , expect : Expect msg\n    , timeout : Maybe Float\n    , tracker : Maybe String\n    }\n    -> Effect msg\nrequest options =\n    HttpRequest options\n\n\ntype Effect msg\n    = None\n    | Batch (List (Effect msg))\n      --\n    | SendMsg msg\n    | SendMsgAfter Int msg\n      -- Random generation\n    | Generate (Random.Generator msg)\n      -- Time\n    | Now (Maybe Float) (Time.Posix -> msg)\n      -- Focus/Blur\n    | Focus String (Result Browser.Dom.Error () -> msg)\n    | Blur String (Result Browser.Dom.Error () -> msg)\n      -- Urls\n    | PushUrl String\n    | ReplaceUrl String\n      -- Files\n    | File (List String) (File.File -> msg)\n    | Files (List String) (File.File -> List File.File -> msg)\n    | FileToUrl File.File (String -> msg)\n      -- Loading\n    | ViewUpdated (App.View.Id.Operation App.Page.Id.Id)\n    | Preload App.Page.Id.Id\n    | Load String\n    | Reload\n      -- History navigation\n    | Forward Int\n    | Back Int\n      -- Http\n    | HttpRequest (RequestDetails msg)\n      -- JS interop\n    | SendToWorld\n        { tag : String\n        , details : Maybe Json.Encode.Value\n        }\n\n\ntype alias RequestDetails msg =\n    { method : String\n    , headers : List Http.Header\n    , url : String\n    , body : Http.Body\n    , expect : Expect msg\n    , timeout : Maybe Float\n    , tracker : Maybe String\n    }\n\n\ntype Expect msg\n    = ExpectString (Result Http.Error String -> msg)\n    | ExpectJson (Json.Decode.Decoder msg) (Http.Error -> msg)\n    | ExpectBytes (Bytes.Decode.Decoder msg) (Http.Error -> msg)\n    | ExpectWhatever (Result Http.Error () -> msg)\n\n\nexpectString : (Result Http.Error String -> msg) -> Expect msg\nexpectString =\n    ExpectString\n\n\nexpectJson : Json.Decode.Decoder msg -> (Http.Error -> msg) -> Expect msg\nexpectJson =\n    ExpectJson\n\n\nexpectBytes : Bytes.Decode.Decoder msg -> (Http.Error -> msg) -> Expect msg\nexpectBytes =\n    ExpectBytes\n\n\nexpectWhatever : (Result Http.Error () -> msg) -> Expect msg\nexpectWhatever =\n    ExpectWhatever\n\n\nport outgoing : { tag : String, details : Maybe Json.Encode.Value } -> Cmd msg\n\n\ntoCmd :\n    { options\n        | navKey : Browser.Navigation.Key\n        , preload : App.Page.Id.Id -> msg\n        , regionUpdate : App.View.Id.Operation App.Page.Id.Id -> msg\n    }\n    -> Effect msg\n    -> Cmd msg\ntoCmd options effect =\n    case effect of\n        None ->\n            Cmd.none\n\n        Batch effects ->\n            Cmd.batch (List.map (toCmd options) effects)\n\n        Generate generator ->\n            Random.generate identity generator\n\n        Now Nothing toMsg ->\n            Time.now\n                |> Task.perform toMsg\n\n        Now (Just wait) toMsg ->\n            Process.sleep wait\n                |> Task.andThen\n                    (\\_ -> Time.now)\n                |> Task.perform toMsg\n\n        Focus id toMsg ->\n            Process.sleep 1\n                |> Task.andThen\n                    (\\_ -> Browser.Dom.focus id)\n                |> Task.attempt toMsg\n\n        Blur id toMsg ->\n            Browser.Dom.blur id\n                |> Task.attempt toMsg\n\n        PushUrl url ->\n            Browser.Navigation.pushUrl options.navKey url\n\n        ReplaceUrl url ->\n            Browser.Navigation.replaceUrl options.navKey url\n\n        ViewUpdated op ->\n            Task.succeed ()\n                |> Task.perform\n                    (\\_ ->\n                        options.regionUpdate op\n                    )\n\n        Load url ->\n            Browser.Navigation.load url\n\n        Reload ->\n            Browser.Navigation.reload\n\n        Forward steps ->\n            Browser.Navigation.forward options.navKey steps\n\n        Back steps ->\n            Browser.Navigation.back options.navKey steps\n\n        SendToWorld outgoingMsg ->\n            outgoing outgoingMsg\n\n        SendMsg msg ->\n            Task.succeed ()\n                |> Task.perform (\\_ -> msg)\n\n        SendMsgAfter delay msg ->\n            Process.sleep (toFloat delay)\n                |> Task.map (\\_ -> msg)\n                |> Task.perform identity\n\n        Preload pageId ->\n            Task.succeed ()\n                |> Task.perform (\\_ -> options.preload pageId)\n\n        File extensions toMsg ->\n            File.Select.file extensions toMsg\n\n        Files extensions toMsg ->\n            File.Select.files extensions toMsg\n\n        FileToUrl fileData toMsg ->\n            File.toUrl fileData\n                |> Task.perform toMsg\n\n        HttpRequest req ->\n            Http.request\n                { method = req.method\n                , body = req.body\n                , url = req.url\n                , headers = req.headers\n                , expect = toHttpExpect req.expect\n                , timeout = req.timeout\n                , tracker = req.tracker\n                }\n\n\nmap : (a -> b) -> Effect a -> Effect b\nmap f effect =\n    case effect of\n        None ->\n            None\n\n        Batch effects ->\n            Batch (List.map (map f) effects)\n\n        PushUrl url ->\n            PushUrl url\n\n        ReplaceUrl url ->\n            ReplaceUrl url\n\n        ViewUpdated op ->\n            ViewUpdated op\n\n        Load url ->\n            Load url\n\n        Reload ->\n            Reload\n\n        Forward n ->\n            Forward n\n\n        Back n ->\n            Back n\n\n        SendToWorld { tag, details } ->\n            SendToWorld { tag = tag, details = details }\n\n        SendMsg msg ->\n            SendMsg (f msg)\n\n        SendMsgAfter delay msg ->\n            SendMsgAfter delay (f msg)\n\n        Focus id msg ->\n            Focus id (msg >> f)\n\n        Blur id msg ->\n            Blur id (msg >> f)\n\n        Preload route ->\n            Preload route\n\n        HttpRequest req ->\n            HttpRequest\n                { method = req.method\n                , headers = req.headers\n                , url = req.url\n                , body = req.body\n                , expect = mapExpect f req.expect\n                , timeout = req.timeout\n                , tracker = req.tracker\n                }\n\n        File extensions toMsg ->\n            File extensions (toMsg >> f)\n\n        Files extensions toMsg ->\n            Files extensions (\\top remaining -> toMsg top remaining |> f)\n\n        FileToUrl fileData toMsg ->\n            FileToUrl fileData (toMsg >> f)\n\n        Now maybeWait toMsg ->\n            Now maybeWait (toMsg >> f)\n\n        Generate generator ->\n            Generate (Random.map f generator)\n\n\ntoHttpExpect : Expect msg -> Http.Expect msg\ntoHttpExpect expect =\n    case expect of\n        ExpectString toMsg ->\n            Http.expectString toMsg\n\n        ExpectJson decoder onError ->\n            Http.expectJson\n                (\\result ->\n                    case result of\n                        Err err ->\n                            onError err\n\n                        Ok value ->\n                            value\n                )\n                decoder\n\n        ExpectBytes decoder onError ->\n            Http.expectBytes\n                (\\result ->\n                    case result of\n                        Err err ->\n                            onError err\n\n                        Ok value ->\n                            value\n                )\n                decoder\n\n        ExpectWhatever toMsg ->\n            Http.expectWhatever toMsg\n\n\nmapExpect : (a -> b) -> Expect a -> Expect b\nmapExpect fn expect =\n    case expect of\n        ExpectString toMsg ->\n            ExpectString (toMsg >> fn)\n\n        ExpectJson decoder onError ->\n            ExpectJson (Json.Decode.map fn decoder) (onError >> fn)\n\n        ExpectBytes decoder onError ->\n            ExpectBytes (Bytes.Decode.map fn decoder) (onError >> fn)\n\n        ExpectWhatever toMsg ->\n            ExpectWhatever (toMsg >> fn)\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/Flags.elm"))) {
    const filepath = path.join(baseDir, "/App/Flags.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module App.Flags exposing (Flags, decode)\n\n{-| [Flags are the initial data that is passed to your Elm app when you start it.](https://guide.elm-lang.org/interop/flags)\n\nSome common ones are:\n\n  - API keys\n  - Endpoint URLS (Maybe you want a different url for prod vs dev)\n  - Startup time\n  - Initial data from local storage\n\n-}\n\nimport App.Effect.LocalStorage as LocalStorage\nimport Json.Decode as Json\nimport Time\n\n\ntype alias Flags =\n    { now : Time.Posix\n    , localStorage : LocalStorage.LocalStorage\n    }\n\n\ndecode : Json.Value -> Result Json.Error Flags\ndecode =\n    Json.decodeValue decoder\n\n\ndecoder : Json.Decoder Flags\ndecoder =\n    Json.map2\n        (\\now localStorage ->\n            { now = now\n            , localStorage = localStorage\n            }\n        )\n        (Json.field \"now\" Json.int\n            |> Json.map Time.millisToPosix\n        )\n        (Json.field \"localStorage\"\n            LocalStorage.decode\n        )\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/Shared.elm"))) {
    const filepath = path.join(baseDir, "/App/Shared.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module App.Shared exposing\n    ( Shared\n    , Authenticated(..), isLoggedIn\n    )\n\n{-| Data that is shared between the global app and the individual pages.\n\n@docs Shared\n\n@docs Authenticated, isLoggedIn\n\n-}\n\n\ntype alias Shared =\n    { authenticated : Authenticated }\n\n\ntype Authenticated\n    = Authenticated\n    | Unauthenticated\n\n\nisLoggedIn : Shared -> Bool\nisLoggedIn shared =\n    case shared.authenticated of\n        Authenticated ->\n            True\n\n        Unauthenticated ->\n            False\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/Sub.elm"))) {
    const filepath = path.join(baseDir, "/App/Sub.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "port module App.Sub exposing\n    ( none, batch\n    , onKeyPress\n    , every\n    , onResize, onLocalStorageUpdated\n    , map, toSubscription\n    , Sub\n    )\n\n{-|\n\n\n# Subscriptions\n\n@docs Subscription\n\n@docs none, batch\n\n@docs onKeyPress\n\n@docs every\n\n@docs onResize, onLocalStorageUpdated\n\n@docs map, toSubscription\n\n-}\n\nimport Browser.Events\nimport Json.Decode\nimport Json.Encode\nimport Platform.Sub\nimport Time\n\n\ntype Sub msg\n    = Sub (Platform.Sub.Sub msg)\n    | Batch (List (Sub msg))\n      -- Common subscriptions\n    | Every Float (Time.Posix -> msg)\n    | OnWindowResize (Int -> Int -> msg)\n    | OnKeyPress\n        { ctrl : Bool\n        , shift : Bool\n        , key : String\n        }\n        msg\n      --\n    | OnLocalStorageUpdated\n        { key : String\n        , decoder : Json.Decode.Decoder msg\n        }\n\n\n{-| -}\nnone : Sub msg\nnone =\n    Sub Platform.Sub.none\n\n\n{-| -}\nbatch : List (Sub msg) -> Sub msg\nbatch =\n    Batch\n\n\n{-| -}\nonKeyPress : { ctrl : Bool, shift : Bool, key : String } -> msg -> Sub msg\nonKeyPress options msg =\n    OnKeyPress options msg\n\n\n{-| -}\nevery : Float -> (Time.Posix -> msg) -> Sub msg\nevery ms toMsg =\n    Every ms toMsg\n\n\n{-| -}\nonResize : (Int -> Int -> msg) -> Sub msg\nonResize msg =\n    OnWindowResize msg\n\n\nonLocalStorageUpdated :\n    { key : String\n    , decoder : Json.Decode.Decoder msg\n    }\n    -> Sub msg\nonLocalStorageUpdated options =\n    OnLocalStorageUpdated options\n\n\n{-| -}\nmap : (a -> b) -> Sub a -> Sub b\nmap func sub =\n    case sub of\n        Sub subscription ->\n            Sub (Platform.Sub.map func subscription)\n\n        Batch subs ->\n            Batch (List.map (map func) subs)\n\n        Every ms toMsg ->\n            Every ms (func << toMsg)\n\n        OnKeyPress options msg ->\n            OnKeyPress options (func msg)\n\n        OnWindowResize msg ->\n            OnWindowResize (\\w h -> func <| msg w h)\n\n        OnLocalStorageUpdated { key, decoder } ->\n            OnLocalStorageUpdated\n                { key = key\n                , decoder = Json.Decode.map func decoder\n                }\n\n\n{-| -}\ntoSubscription : { ignore : String -> msg } -> Sub msg -> Platform.Sub.Sub msg\ntoSubscription options sub =\n    case sub of\n        Sub subscription ->\n            subscription\n\n        Batch subs ->\n            Platform.Sub.batch (List.map (toSubscription options) subs)\n\n        Every ms toMsg ->\n            Time.every ms toMsg\n\n        OnWindowResize toMsg ->\n            Browser.Events.onResize toMsg\n\n        OnKeyPress keyOptions msg ->\n            Browser.Events.onKeyDown\n                (Json.Decode.map4\n                    (\\_ ctrl shift meta ->\n                        { ctrl = ctrl\n                        , shift = shift\n                        , meta = meta\n                        }\n                    )\n                    (Json.Decode.field \"key\" Json.Decode.string\n                        |> Json.Decode.andThen\n                            (\\key ->\n                                if String.toLower key == String.toLower keyOptions.key then\n                                    Json.Decode.succeed True\n\n                                else\n                                    Json.Decode.fail \"Not a match\"\n                            )\n                    )\n                    (Json.Decode.field \"ctrlKey\" Json.Decode.bool)\n                    (Json.Decode.field \"shiftKey\" Json.Decode.bool)\n                    (Json.Decode.field \"metaKey\" Json.Decode.bool)\n                    |> Json.Decode.andThen\n                        (\\event ->\n                            -- accept both \"meta\" (Cmd on macs)\n                            --  and \"ctrl\"\n                            if (keyOptions.ctrl == event.ctrl || keyOptions.ctrl == event.meta) && keyOptions.shift == event.shift then\n                                Json.Decode.succeed msg\n\n                            else\n                                Json.Decode.fail \"Not a match\"\n                        )\n                )\n\n        OnLocalStorageUpdated { key, decoder } ->\n            localStorageUpdated\n                (\\payload ->\n                    if payload.key == key then\n                        case Json.Decode.decodeValue decoder payload.details of\n                            Ok value ->\n                                value\n\n                            Err _ ->\n                                options.ignore key\n\n                    else\n                        options.ignore key\n                )\n\n\nport localStorageUpdated :\n    ({ key : String\n     , details : Json.Encode.Value\n     }\n     -> msg\n    )\n    -> Platform.Sub.Sub msg\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/App/View.elm"))) {
    const filepath = path.join(baseDir, "/App/View.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module App.View exposing\n    ( View, map\n    , Regions\n    )\n\n{-|\n\n@docs View, map\n\n@docs Regions\n\n-}\n\nimport Html\n\n\ntype alias View msg =\n    { title : String\n    , body : Html.Html msg\n    }\n\n\nmap : (a -> b) -> View a -> View b\nmap fn myView =\n    { title = myView.title\n    , body = Html.map fn myView.body\n    }\n\n\n\n{- Regions -}\n\n\n{-| -}\ntype alias Regions view =\n    { primary : Maybe view\n    , nav : Maybe view\n    , detail : List view\n    }\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || !fs.existsSync(path.join(baseDir, "/Main.elm"))) {
    const filepath = path.join(baseDir, "/Main.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Main exposing (main)\n\n{-| -}\n\nimport App\nimport App.Effect\nimport App.Flags\nimport App.Page.Id\nimport App.Route\nimport App.Shared\nimport App.Sub\nimport App.View\nimport App.View.Id\nimport Browser\nimport Html\nimport Json.Decode\nimport Json.Encode as Json\nimport Url\n\n\ntype alias Model =\n    { shared : App.Shared.Shared\n    , flags : Result Json.Decode.Error App.Flags.Flags\n    }\n\n\n{-| -}\nmain : App.App Model Msg\nmain =\n    App.app\n        { init = init\n        , onUrlChange = UrlChanged\n        , onUrlRequest = UrlRequested\n        , update = update\n        , subscriptions = subscriptions\n        , toCmd = toCmd\n        , toSub = toSub\n        , toShared = .shared\n        , view =\n            \\fromFrameMsg model regions ->\n                case regions.primary of\n                    Nothing ->\n                        { title = \"Nothing\"\n                        , body = [ Html.text \"Nothing\" ]\n                        }\n\n                    Just (App.Loading _) ->\n                        { title = \"Loading\"\n                        , body = [ Html.text \"Loading\" ]\n                        }\n\n                    Just App.NotFound ->\n                        --\n                        { title = \"Not found\"\n                        , body = [ Html.text \"Not found\" ]\n                        }\n\n                    Just (App.Error error) ->\n                        -- error is a type you control that lives at App.Page.Error\n                        { title = \"Not found\"\n                        , body = [ Html.text \"Not found\" ]\n                        }\n\n                    Just (App.View page) ->\n                        view fromFrameMsg model page\n        }\n\n\ninit : Json.Value -> Url.Url -> ( Model, App.Effect.Effect Msg )\ninit flagsValue url =\n    let\n        decodedFlags =\n            App.Flags.decode flagsValue\n\n        initial =\n            App.Route.parse url\n\n        model =\n            { shared =\n                { authenticated =\n                    App.Shared.Unauthenticated\n                }\n            , flags = decodedFlags\n            }\n    in\n    gotoUrl url model App.Effect.none\n\n\n\n{-\n   Subscriptions and Commands\n\n-}\n\n\nsubscriptions : Model -> App.Sub.Sub Msg\nsubscriptions model =\n    App.Sub.none\n\n\ntoSub : App.SubOptions Msg -> Model -> App.Sub.Sub (App.Msg Msg) -> Sub.Sub (App.Msg Msg)\ntoSub options model sub =\n    App.Sub.toSubscription options sub\n\n\ntoCmd : App.CmdOptions Msg -> Model -> App.Effect.Effect (App.Msg Msg) -> Cmd (App.Msg Msg)\ntoCmd options model effect =\n    case model.flags of\n        Err _ ->\n            Cmd.none\n\n        Ok flags ->\n            App.Effect.toCmd options effect\n\n\nview :\n    (Msg -> App.Msg Msg)\n    -> Model\n    -> App.View.View (App.Msg Msg)\n    -> Browser.Document (App.Msg Msg)\nview fromFrameMsg model innerView =\n    { title = innerView.title\n    , body =\n        [ innerView.body\n        ]\n    }\n\n\n\n{-\n   Updates\n-}\n\n\ntype Msg\n    = UrlChanged Url.Url\n    | UrlRequested Browser.UrlRequest\n\n\nupdate : Msg -> Model -> ( Model, App.Effect.Effect Msg )\nupdate msg model =\n    case msg of\n        UrlRequested (Browser.Internal url) ->\n            case App.Route.parse url of\n                Nothing ->\n                    ( model\n                    , App.Effect.none\n                    )\n\n                Just route ->\n                    ( model\n                    , App.Effect.navigateTo route.route\n                    )\n\n        UrlRequested (Browser.External urlStr) ->\n            ( model, App.Effect.pushUrl urlStr )\n\n        UrlChanged url ->\n            gotoUrl url model App.Effect.none\n\n\ngotoUrl : Url.Url -> Model -> App.Effect.Effect Msg -> ( Model, App.Effect.Effect Msg )\ngotoUrl url model eff =\n    case App.Route.parse url of\n        Nothing ->\n            ( model\n            , eff\n            )\n\n        Just route ->\n            gotoRoute route model eff\n\n\ngotoRoute : { isRedirect : Bool, route : App.Route.Route } -> Model -> App.Effect.Effect Msg -> ( Model, App.Effect.Effect Msg )\ngotoRoute { isRedirect, route } model eff =\n    case route of\n        App.Route.Logout params ->\n            ( { model\n                | shared =\n                    { authenticated = App.Shared.Unauthenticated\n                    }\n              }\n            , App.Effect.batch\n                [ App.Effect.replaceUrl \"/\"\n                , eff\n                ]\n            )\n\n        _ ->\n            let\n                pageId =\n                    if routeRequiresAuthentication route && not (App.Shared.isLoggedIn model.shared) then\n                        App.Page.Id.Home {}\n\n                    else\n                        routeToPageId route\n            in\n            ( model\n            , App.Effect.batch\n                [ App.Effect.loadAt App.View.Id.Primary pageId\n                , eff\n                ]\n            )\n\n\nrouteRequiresAuthentication : App.Route.Route -> Bool\nrouteRequiresAuthentication route =\n    True\n\n\nrouteToPageId : App.Route.Route -> App.Page.Id.Id\nrouteToPageId route =\n    case route of\n        App.Route.Home _ ->\n            App.Page.Id.Home {}\n\n        App.Route.Logout _ ->\n            App.Page.Id.Home {}\n\n        App.Route.Login _ ->\n            App.Page.Id.Home {}\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }
}