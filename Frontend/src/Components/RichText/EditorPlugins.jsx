import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

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
            <HistoryPlugin />
        </div>
    );
};

export default EditorFocusPlugin;
