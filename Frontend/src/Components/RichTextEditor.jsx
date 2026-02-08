import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
    Bold,
    Italic,
    Underline,
    Link,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
} from "lucide-react";
import { useState } from "react";

const initialConfig = {
    namespace: "RichEditor",
    theme: {
        paragraph: "editor-paragraph",
    },
    onError: console.error,
    nodes: [ListNode, ListItemNode, LinkNode],
};

const RichTextEditor = ({ value, onChange, className = "w-full" }) => {
    const ToolbarPlugin = () => {
        const [editor] = useLexicalComposerContext();
        const [alignment, setAlignment] = useState("left");

        const insertLink = () => {
            const url = prompt("Enter URL:");
            if (url) {
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
            }
        };

        const cycleAlignment = () => {
            const alignments = ["left", "center", "right", "justify"];
            const currentIndex = alignments.indexOf(alignment);
            const nextIndex = (currentIndex + 1) % alignments.length;
            const nextAlignment = alignments[nextIndex];

            setAlignment(nextAlignment);
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, nextAlignment);
        };

        const getAlignmentIcon = () => {
            switch (alignment) {
                case "center":
                    return <AlignCenter size={14} />;
                case "right":
                    return <AlignRight size={14} />;
                case "justify":
                    return <AlignJustify size={14} />;
                default:
                    return <AlignLeft size={14} />;
            }
        };

        const Button = ({ onClick, title, children, active = false }) => (
            <button
                onClick={onClick}
                className={`flex items-center justify-center rounded-lg border p-2 transition-all ${
                    active
                        ? "border-amber-500 bg-amber-500/10 text-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.2)]"
                        : "border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-200"
                }`}
                title={title}
            >
                {children}
            </button>
        );

        return (
            <div className="flex flex-wrap gap-2 rounded-t-xl border-b border-zinc-800 bg-zinc-900 p-2">
                <Button
                    onClick={() =>
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
                    }
                    title="Bold"
                >
                    <Bold size={14} />
                </Button>
                <Button
                    onClick={() =>
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
                    }
                    title="Italic"
                >
                    <Italic size={14} />
                </Button>
                <Button
                    onClick={() =>
                        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
                    }
                    title="Underline"
                >
                    <Underline size={14} />
                </Button>

                <div className="mx-1 h-6 w-px self-center bg-zinc-800" />

                <Button onClick={insertLink} title="Link">
                    <Link size={14} />
                </Button>

                <div className="mx-1 h-6 w-px self-center bg-zinc-800" />

                <Button
                    onClick={cycleAlignment}
                    title={`Align: ${alignment.charAt(0).toUpperCase() + alignment.slice(1)} (Click to cycle)`}
                    active={alignment !== "left"}
                >
                    {getAlignmentIcon()}
                </Button>
            </div>
        );
    };

    const EditorFocusPlugin = () => {
        const [editor] = useLexicalComposerContext();
        return (
            <div
                className="relative min-h-[300px] cursor-text p-2"
                onClick={() => editor.focus()}
            >
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="h-full min-h-[280px] w-full outline-none" />
                    }
                />
                <ListPlugin />
                <LinkPlugin />
            </div>
        );
    };

    return (
        <div
            className={`overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 ${className}`}
        >
            <style>{`
                .RichEditor__contentEditable {
                    padding: 16px !important;
                    min-height: 280px;
                    color: #fafafa;
                }
                .editor-paragraph {
                    margin-bottom: 8px !important;
                    text-align: left;
                }
                .RichEditor__contentEditable:focus {
                    outline: none;
                }
            `}</style>
            <LexicalComposer initialConfig={initialConfig}>
                <ToolbarPlugin />
                <EditorFocusPlugin />
                <OnChangePlugin
                    onChange={(editorState) => {
                        editorState.read(() => {
                            onChange(editorState.toString() || "");
                        });
                    }}
                />
            </LexicalComposer>
        </div>
    );
};

export default RichTextEditor;
