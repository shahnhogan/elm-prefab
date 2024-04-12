
import * as path from "path";
import * as fs from "fs";
import * as Options from "../../options";

export const copyTo = (baseDir: string, overwrite: boolean, skip: boolean, summary: Options.Summary) => { 
  
  if (overwrite || (!fs.existsSync(path.join(baseDir, "/App/View.elm")) && !skip)) {
    const filepath = path.join(baseDir, "/App/View.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module App.View exposing\n    ( View, map\n    , Regions\n    )\n\n{-|\n\n@docs View, map\n\n@docs Regions\n\n-}\n\nimport Ui\n\n\ntype alias View msg =\n    { title : String\n    , body : Ui.Element msg\n    }\n\n\nmap : (a -> b) -> View a -> View b\nmap fn myView =\n    { title = myView.title\n    , body = Ui.map fn myView.body\n    }\n\n\n\n{- Regions -}\n\n\n{-| -}\ntype alias Regions view =\n    { primary : Maybe view\n    , nav : Maybe view\n    , detail : List view\n    }\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/Page/Guide.elm")) && !skip)) {
    const filepath = path.join(baseDir, "/Page/Guide.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Page.Guide exposing (page, Model, Msg)\n\n{-|\n\n@docs page, Model, Msg\n\n-}\n\nimport App.Effect\nimport App.Page\nimport App.Page.Id\nimport App.Resources\nimport App.Sub\nimport App.View\nimport App.View.Id\nimport Ui\n\n\n{-| -}\ntype alias Model =\n    {}\n\n\n{-| -}\ntype Msg\n    = ReplaceMe\n\n\npage : App.Page.Page App.Resources.Resources App.Page.Id.Guide_Params Msg Model\npage =\n    App.Page.page\n        { init = init\n        , update = update\n        , subscriptions = subscriptions\n        , view = view\n        }\n\n\ninit : App.Page.Id.Guide_Params -> App.Resources.Resources -> Maybe Model -> App.Page.Init Msg Model\ninit params shared maybeCached =\n    App.Page.init {}\n\n\nupdate : App.Resources.Resources -> Msg -> Model -> ( Model, App.Effect.Effect Msg )\nupdate shared msg model =\n    ( model, App.Effect.none )\n\n\nsubscriptions : App.Resources.Resources -> Model -> App.Sub.Sub Msg\nsubscriptions shared model =\n    App.Sub.none\n\n\nview : App.View.Id.Id -> App.Resources.Resources -> Model -> App.View.View Msg\nview viewId shared model =\n    { title = \"Home\"\n    , body = Ui.text \"Home\"\n    }\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/Page/Home.elm")) && !skip)) {
    const filepath = path.join(baseDir, "/Page/Home.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Page.Home exposing (page, Model, Msg)\n\n{-|\n\n@docs page, Model, Msg\n\n-}\n\nimport App.Effect\nimport App.Page\nimport App.Page.Id\nimport App.Resources\nimport App.Route\nimport App.Sub\nimport App.View\nimport App.View.Id\nimport Docs.Packages\nimport Theme.Layout as Layout\nimport Theme.Text as Text\nimport Ui\n\n\n{-| -}\ntype alias Model =\n    {}\n\n\n{-| -}\ntype Msg\n    = ReplaceMe\n\n\npage : App.Page.Page App.Resources.Resources App.Page.Id.Home_Params Msg Model\npage =\n    App.Page.page\n        { init = init\n        , update = update\n        , subscriptions = subscriptions\n        , view = view\n        }\n\n\ninit : App.Page.Id.Home_Params -> App.Resources.Resources -> Maybe Model -> App.Page.Init Msg Model\ninit params shared maybeCached =\n    App.Page.init {}\n\n\nupdate : App.Resources.Resources -> Msg -> Model -> ( Model, App.Effect.Effect Msg )\nupdate shared msg model =\n    ( model, App.Effect.none )\n\n\nsubscriptions : App.Resources.Resources -> Model -> App.Sub.Sub Msg\nsubscriptions shared model =\n    App.Sub.none\n\n\nview : App.View.Id.Id -> App.Resources.Resources -> Model -> App.View.View Msg\nview viewId shared model =\n    { title = \"Directory\"\n    , body = viewPackages\n    }\n\n\nviewPackages =\n    Layout.column.lg2 []\n        [ Text.h1 \"Packages\"\n        , Layout.column.md []\n            (List.map viewPackage Docs.Packages.directory)\n        ]\n\n\nviewPackage package =\n    Ui.el\n        [ Ui.link\n            (App.Route.toString\n                (App.Route.Package { path_ = String.split \"/\" package.name })\n            )\n        ]\n        (Ui.text package.name)\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/Page/Module.elm")) && !skip)) {
    const filepath = path.join(baseDir, "/Page/Module.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Page.Module exposing (page, Model, Msg)\n\n{-|\n\n@docs page, Model, Msg\n\n-}\n\nimport App.Effect\nimport App.Page\nimport App.Page.Id\nimport App.Resources\nimport App.Sub\nimport App.View\nimport App.View.Id\nimport Ui\n\n\n{-| -}\ntype alias Model =\n    {}\n\n\n{-| -}\ntype Msg\n    = ReplaceMe\n\n\npage : App.Page.Page App.Resources.Resources App.Page.Id.Module_Params Msg Model\npage =\n    App.Page.page\n        { init = init\n        , update = update\n        , subscriptions = subscriptions\n        , view = view\n        }\n\n\ninit : App.Page.Id.Module_Params -> App.Resources.Resources -> Maybe Model -> App.Page.Init Msg Model\ninit params shared maybeCached =\n    App.Page.init {}\n\n\nupdate : App.Resources.Resources -> Msg -> Model -> ( Model, App.Effect.Effect Msg )\nupdate shared msg model =\n    ( model, App.Effect.none )\n\n\nsubscriptions : App.Resources.Resources -> Model -> App.Sub.Sub Msg\nsubscriptions shared model =\n    App.Sub.none\n\n\nview : App.View.Id.Id -> App.Resources.Resources -> Model -> App.View.View Msg\nview viewId shared model =\n    { title = \"Module\"\n    , body = Ui.text \"Module\"\n    }\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/Page/Package.elm")) && !skip)) {
    const filepath = path.join(baseDir, "/Page/Package.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Page.Package exposing (page, Model, Msg)\n\n{-|\n\n@docs page, Model, Msg\n\n-}\n\nimport App.Effect\nimport App.Page\nimport App.Page.Id\nimport App.Resources\nimport App.Sub\nimport App.View\nimport App.View.Id\nimport Docs.Packages\nimport Elm.Docs\nimport Theme.Layout as Layout\nimport Theme.Text as Text\nimport Ui\nimport Ui.Events as Events\nimport Ui.Markdown\n\n\n{-| -}\ntype alias Model =\n    { name : String\n    , modules : List Elm.Docs.Module\n    , focusedModule : Maybe String\n    }\n\n\n{-| -}\ntype Msg\n    = ModuleClicked String\n\n\npage : App.Page.Page App.Resources.Resources App.Page.Id.Package_Params Msg Model\npage =\n    App.Page.page\n        { init = init\n        , update = update\n        , subscriptions = subscriptions\n        , view = view\n        }\n\n\ninit : App.Page.Id.Package_Params -> App.Resources.Resources -> Maybe Model -> App.Page.Init Msg Model\ninit params shared maybeCached =\n    let\n        key =\n            String.join \"/\" params.path_\n\n        docs =\n            List.foldl\n                (\\doc found ->\n                    case found of\n                        Just d ->\n                            found\n\n                        Nothing ->\n                            if doc.name == key then\n                                Just doc\n\n                            else\n                                Nothing\n                )\n                Nothing\n                Docs.Packages.directory\n    in\n    case docs of\n        Nothing ->\n            App.Page.notFound\n\n        Just doc ->\n            App.Page.init\n                { name = doc.name\n                , modules = doc.modules\n                , focusedModule =\n                    List.head doc.modules\n                        |> Maybe.map .name\n                }\n\n\nupdate : App.Resources.Resources -> Msg -> Model -> ( Model, App.Effect.Effect Msg )\nupdate shared msg model =\n    case msg of\n        ModuleClicked name ->\n            ( { model | focusedModule = Just name }, App.Effect.none )\n\n\nsubscriptions : App.Resources.Resources -> Model -> App.Sub.Sub Msg\nsubscriptions shared model =\n    App.Sub.none\n\n\ngetModule : List Elm.Docs.Module -> String -> Maybe Elm.Docs.Module\ngetModule modules name =\n    List.foldl\n        (\\mod found ->\n            case found of\n                Just m ->\n                    found\n\n                Nothing ->\n                    if mod.name == name then\n                        Just mod\n\n                    else\n                        Nothing\n        )\n        Nothing\n        modules\n\n\nview : App.View.Id.Id -> App.Resources.Resources -> Model -> App.View.View Msg\nview viewId shared model =\n    { title = model.name\n    , body =\n        Layout.column.md []\n            [ Text.h1 model.name\n            , Layout.column.md []\n                (List.map\n                    (\\mod ->\n                        Ui.el\n                            [ Events.onClick (ModuleClicked mod.name) ]\n                            (Ui.text mod.name)\n                    )\n                    model.modules\n                )\n            , case Maybe.andThen (getModule model.modules) model.focusedModule of\n                Nothing ->\n                    Ui.none\n\n                Just focusedModule ->\n                    viewModule focusedModule\n            ]\n    }\n\n\nviewModule : Elm.Docs.Module -> Ui.Element Msg\nviewModule mod =\n    Layout.column.md []\n        [ Text.h2 mod.name\n        , Ui.text mod.comment\n        , Layout.column.md []\n            (mod\n                |> Elm.Docs.toBlocks\n                |> List.map\n                    viewBlock\n            )\n        ]\n\n\nviewBlock : Elm.Docs.Block -> Ui.Element Msg\nviewBlock block =\n    case block of\n        Elm.Docs.MarkdownBlock markdown ->\n            Ui.Markdown.view markdown\n\n        Elm.Docs.UnionBlock details ->\n            Layout.column.md []\n                [ Ui.Markdown.view details.comment\n                ]\n\n        Elm.Docs.AliasBlock details ->\n            Layout.column.md []\n                [ Ui.Markdown.view details.comment\n                ]\n\n        Elm.Docs.ValueBlock details ->\n            Layout.column.md []\n                [ Ui.Markdown.view details.comment\n                ]\n\n        Elm.Docs.BinopBlock details ->\n            Layout.column.md []\n                [ Ui.Markdown.view details.comment\n                ]\n\n        Elm.Docs.UnknownBlock text ->\n            Ui.text text\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }

  if (overwrite || (!fs.existsSync(path.join(baseDir, "/Main.elm")) && !skip)) {
    const filepath = path.join(baseDir, "/Main.elm");
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, "module Main exposing (main)\n\n{-| -}\n\nimport App\nimport App.Effect\nimport App.Flags\nimport App.Page.Id\nimport App.Resources\nimport App.Route\nimport App.Sub\nimport App.View\nimport App.View.Id\nimport Browser\nimport Html\nimport Json.Decode\nimport Json.Encode as Json\nimport Ui\nimport Ui.Anim\nimport Url\n\n\ntype alias Model =\n    { flags : Result Json.Decode.Error App.Flags.Flags\n    , ui : Ui.Anim.State\n    }\n\n\n{-| -}\nmain : App.App Model Msg\nmain =\n    App.app\n        { init = init\n        , onUrlChange = UrlChanged\n        , onUrlRequest = UrlRequested\n        , update = update\n        , subscriptions = subscriptions\n        , toCmd = toCmd\n        , toSub = toSub\n        , view =\n            \\resources toAppMsg model regions ->\n                case regions.primary of\n                    Nothing ->\n                        { title = \"Nothing\"\n                        , body = [ Html.text \"Nothing\" ]\n                        }\n\n                    Just (App.Loading _) ->\n                        { title = \"Loading\"\n                        , body = [ Html.text \"Loading\" ]\n                        }\n\n                    Just App.NotFound ->\n                        --\n                        { title = \"Not found\"\n                        , body = [ Html.text \"Not found\" ]\n                        }\n\n                    Just (App.Error error) ->\n                        -- error is a type you control that lives at App.Page.Error\n                        { title = \"Not found\"\n                        , body = [ Html.text \"Not found\" ]\n                        }\n\n                    Just (App.View page) ->\n                        view resources toAppMsg model page\n        }\n\n\ninit : Json.Value -> Url.Url -> ( Model, App.Effect.Effect Msg )\ninit flagsValue url =\n    let\n        decodedFlags =\n            App.Flags.decode flagsValue\n\n        initial =\n            App.Route.parse url\n\n        model =\n            { flags = decodedFlags\n            , ui = Ui.Anim.init\n            }\n    in\n    gotoUrl url model App.Effect.none\n\n\n\n{-\n   Subscriptions and Commands\n\n-}\n\n\nsubscriptions : App.Resources.Resources -> Model -> App.Sub.Sub Msg\nsubscriptions resources model =\n    App.Sub.none\n\n\ntoSub : App.Resources.Resources -> App.SubOptions Msg -> Model -> App.Sub.Sub (App.Msg Msg) -> Sub.Sub (App.Msg Msg)\ntoSub resources options model sub =\n    App.Sub.toSubscription options sub\n\n\ntoCmd : App.Resources.Resources -> App.CmdOptions Msg -> Model -> App.Effect.Effect (App.Msg Msg) -> Cmd (App.Msg Msg)\ntoCmd resources options model effect =\n    case model.flags of\n        Err _ ->\n            Cmd.none\n\n        Ok flags ->\n            App.Effect.toCmd options effect\n\n\nview :\n    App.Resources.Resources\n    -> (Msg -> App.Msg Msg)\n    -> Model\n    -> App.View.View (App.Msg Msg)\n    -> Browser.Document (App.Msg Msg)\nview resources toAppMsg model innerView =\n    { title = innerView.title\n    , body =\n        [ Ui.Anim.layout\n            { options = []\n            , toMsg = toAppMsg << Ui\n            , breakpoints = Nothing\n            }\n            model.ui\n            []\n            innerView.body\n        ]\n    }\n\n\n\n{-\n   Updates\n-}\n\n\ntype Msg\n    = UrlChanged Url.Url\n    | UrlRequested Browser.UrlRequest\n    | Ui Ui.Anim.Msg\n\n\nupdate : App.Resources.Resources -> Msg -> Model -> ( Model, App.Effect.Effect Msg )\nupdate resources msg model =\n    case msg of\n        UrlRequested (Browser.Internal url) ->\n            case App.Route.parse url of\n                Nothing ->\n                    ( model\n                    , App.Effect.none\n                    )\n\n                Just route ->\n                    ( model\n                    , App.Effect.navigateTo route.route\n                    )\n\n        UrlRequested (Browser.External urlStr) ->\n            ( model, App.Effect.pushUrl urlStr )\n\n        UrlChanged url ->\n            gotoUrl url model App.Effect.none\n\n        Ui animMsg ->\n            let\n                ( ui, eff ) =\n                    Ui.Anim.update Ui animMsg model.ui\n            in\n            ( { model | ui = ui }\n            , App.Effect.none\n            )\n\n\ngotoUrl : Url.Url -> Model -> App.Effect.Effect Msg -> ( Model, App.Effect.Effect Msg )\ngotoUrl url model eff =\n    case App.Route.parse url of\n        Nothing ->\n            ( model\n            , eff\n            )\n\n        Just route ->\n            gotoRoute route model eff\n\n\ngotoRoute :\n    { isRedirect : Bool, route : App.Route.Route }\n    -> Model\n    -> App.Effect.Effect Msg\n    -> ( Model, App.Effect.Effect Msg )\ngotoRoute { isRedirect, route } model eff =\n    if isRedirect then\n        ( model, App.Effect.replaceUrl (App.Route.toString route) )\n\n    else\n        case App.Page.Id.fromRoute route of\n            Nothing ->\n                ( model, App.Effect.none )\n\n            Just pageId ->\n                ( model\n                , App.Effect.batch\n                    [ App.Effect.loadAt App.View.Id.Primary pageId\n                    , eff\n                    ]\n                )\n");
    const generated = { outputDir: baseDir, path: filepath}
    Options.addGenerated(summary, generated);
  }
}