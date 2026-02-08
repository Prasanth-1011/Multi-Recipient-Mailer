import { useState, useRef } from "react";
import { Upload, FileCheck } from "lucide-react";

function FileUpload({ onFileChange }) {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("No File Selected");

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFileName(selectedFile.name);
            onFileChange && onFileChange(e);
        } else {
            setFileName("No File Selected");
            onFileChange && onFileChange(e);
        }
    };

    return (
        <div className="w-full sm:w-auto">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx"
                hidden
            />

            <div className="flex flex-col items-center gap-6 sm:flex-row">
                <button
                    type="button"
                    onClick={handleButtonClick}
                    className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-zinc-300 shadow-sm transition-all hover:border-amber-500/50 hover:bg-zinc-800 hover:text-amber-500 sm:w-auto"
                >
                    <Upload size={16} />
                    <span className="font-semibold tracking-wider capitalize">
                        Choose Recipients
                    </span>
                </button>

                <div className="flex max-w-[250px] items-center gap-3 overflow-hidden text-sm text-ellipsis whitespace-nowrap text-zinc-500 italic">
                    {fileName !== "No File Selected" && (
                        <FileCheck size={16} className="text-amber-500" />
                    )}
                    <span
                        className={
                            fileName !== "No File Selected"
                                ? "font-medium text-amber-500/90 not-italic"
                                : ""
                        }
                    >
                        {fileName}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default FileUpload;
