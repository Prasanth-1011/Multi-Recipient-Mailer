import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useState } from "react";

import Toolbar from "./Toolbar";
import EditorPlugins from "./EditorPlugins";

const initialConfig = {
    namespace: "RichEditor",
    theme: {
        paragraph: "editor-paragraph",
    },
    onError: console.error,
    nodes: [ListNode, ListItemNode, LinkNode],
};

const RichTextEditor = ({ value, onChange, className = "w-full" }) => {
    const [alignment, setAlignment] = useState("left");

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
                }
                .RichEditor__contentEditable:focus {
                    outline: none;
                }
            `}</style>
            <LexicalComposer initialConfig={initialConfig}>
                <Toolbar alignment={alignment} setAlignment={setAlignment} />
                <EditorPlugins />
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
