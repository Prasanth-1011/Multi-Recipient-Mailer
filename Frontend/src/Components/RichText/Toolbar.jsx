import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    FORMAT_TEXT_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    UNDO_COMMAND,
    REDO_COMMAND,
} from "lexical";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
    Bold,
    Italic,
    Underline,
    Link,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Undo,
    Redo,
} from "lucide-react";

const Toolbar = ({ alignment, setAlignment }) => {
    const [editor] = useLexicalComposerContext();

    const insertLink = () => {
        const url = prompt("Enter URL:");
        if (url) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
        }
    };

    const cycleAlignment = () => {
        const alignments = ["left", "center", "right"];
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

            <div className="mx-1 h-6 w-px self-center bg-zinc-800" />

            <Button
                onClick={() => editor.dispatchCommand(UNDO_COMMAND)}
                title="Undo"
            >
                <Undo size={14} />
            </Button>
            <Button
                onClick={() => editor.dispatchCommand(REDO_COMMAND)}
                title="Redo"
            >
                <Redo size={14} />
            </Button>
        </div>
    );
};

export default Toolbar;
