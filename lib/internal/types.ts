import type { AST, SourceCode } from "eslint"

export type Comment = ReturnType<SourceCode["getAllComments"]>[number]

export type Position = AST.SourceLocation["start"]

export type DirectiveKind =
    | "eslint-disable-line"
    | "eslint-disable-next-line"
    | "eslint-disable"
    | "eslint-enable"

export type DirectiveComment = {
    /**
     * The kind of directive comment.
     */
    kind: DirectiveKind
    /**
     * The directive value if it is `eslint-` comment.
     */
    value: string
    /**
     * The description of the directive comment.
     */
    description?: string | undefined | null
    /**
     * The node of the directive comment.
     */
    node: unknown
    /**
     * The range of the directive comment.
     */
    range: AST.Range
    /**
     * The location of the directive comment.
     */
    loc: AST.SourceLocation
}
