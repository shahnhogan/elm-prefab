module Ui.Module exposing (view)

import Elm.Docs
import Elm.Type
import Html exposing (..)
import Html.Attributes as Attr
import Theme
import Ui.Markdown
import Ui.Type


view : Elm.Docs.Module -> Html msg
view mod =
    Theme.column.lg []
        [ Html.h2 [] [ Html.text mod.name ]
        , Theme.column.lg
            []
            (mod
                |> Elm.Docs.toBlocks
                |> List.map
                    viewBlock
            )
        ]


viewBlock : Elm.Docs.Block -> Html msg
viewBlock block =
    case block of
        Elm.Docs.MarkdownBlock markdown ->
            viewMarkdown markdown

        Elm.Docs.UnionBlock details ->
            Html.div []
                [ viewUnionDefinition details
                , viewMarkdown details.comment
                ]

        Elm.Docs.AliasBlock details ->
            Html.div []
                [ viewName details.name
                , viewMarkdown details.comment
                ]

        Elm.Docs.ValueBlock details ->
            Html.div []
                [ viewTypeDefinition details
                , viewMarkdown details.comment
                ]

        Elm.Docs.BinopBlock details ->
            Html.div []
                [ viewName details.name
                , viewMarkdown details.comment
                ]

        Elm.Docs.UnknownBlock text ->
            Html.text text


viewUnionDefinition : Elm.Docs.Union -> Html msg
viewUnionDefinition details =
    Html.pre []
        [ Html.code []
            [ Html.span [] [ Html.text "type " ]
            , Html.span [] [ Html.text (details.name ++ " ") ]
            , Html.span [] (List.map (\v -> Html.text (v ++ " ")) details.args)
            , Html.span []
                (List.foldl
                    (\( tagName, pieces ) ( isFirst, gathered ) ->
                        let
                            divider =
                                if isFirst then
                                    "="

                                else
                                    "|"

                            isMultiline =
                                List.any Ui.Type.shouldBeMultiline pieces
                        in
                        ( False
                        , Html.span []
                            [ Html.text ("\n    " ++ divider ++ " " ++ tagName ++ " ")
                            , Html.span []
                                (List.map
                                    (\tipe ->
                                        let
                                            lineIsMulti =
                                                Ui.Type.shouldBeMultiline tipe

                                            end =
                                                if lineIsMulti then
                                                    "       )"

                                                else
                                                    ")"

                                            needsParens =
                                                Ui.Type.needsParens tipe
                                        in
                                        if needsParens then
                                            if isMultiline then
                                                Html.div [] [ Html.text "       (", Ui.Type.view tipe, Html.text end ]

                                            else
                                                Html.span [] [ Html.text "(", Ui.Type.view tipe, Html.text ") " ]

                                        else if isMultiline then
                                            Html.div [] [ Html.text "       ", Ui.Type.view tipe ]

                                        else
                                            Html.span [] [ Ui.Type.view tipe, Html.text " " ]
                                    )
                                    pieces
                                )
                            ]
                            :: gathered
                        )
                    )
                    ( True, [] )
                    details.tags
                    |> Tuple.second
                    |> List.reverse
                )
            ]
        ]


viewName : String -> Html msg
viewName name =
    Html.h2 []
        [ Html.text name
        ]


viewTypeDefinition : { docs | name : String, tipe : Elm.Type.Type } -> Html msg
viewTypeDefinition details =
    Theme.row.zero []
        [ Html.span [] [ Html.text (details.name ++ " : ") ]
        , Ui.Type.view details.tipe
        ]


viewMarkdown : String -> Html msg
viewMarkdown markdown =
    Ui.Markdown.view markdown