import axios from "axios";
import { useState } from "react";

import FileUpload from "./FileUpload";
import parseData from "../Utils/Parse.js";

const Mailer = () => {
    const [file, setFile] = useState(null);
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState("");

    const [data, setData] = useState({
        subject: "",
        text: "",
        mails: [],
    });

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const setBack = () => {
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    const handleSending = async () => {
        setLoad(true);
        try {
            if (!file) {
                throw new Error("Please Upload File");
            }

            const mails = await parseData(file);

            if (mails.length === 0) {
                throw new Error("No Mails Found In The File");
            }

            const payload = { ...data, mails };
            console.log(payload);

            const response = await axios.post(
                "http://localhost:3000/api/mail",
                payload,
            );

            setData({
                subject: "",
                text: "",
                mails: [],
            });
            setMessage(response.data?.message || "Emails Sent Successfully!");
        } catch (error) {
            console.error("Sending Error:", error);
            const errorMsg =
                error.response?.data?.message ||
                error.message ||
                "Failed Sending Mails. Please Try Again.";
            setMessage(errorMsg);
        } finally {
            setLoad(false);
            setBack();
        }
    };

    return (
        <main className="flex min-h-[80vh] w-full flex-col items-center justify-center px-4 py-16 md:px-8">
            <div className="flex w-full max-w-4xl flex-col gap-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-[0_0_50px_-12px_rgba(251,191,36,0.1)] backdrop-blur-sm md:p-8">
                <div className="flex flex-col gap-2">
                    <label className="ml-1 text-sm font-bold tracking-wider text-zinc-500 capitalize">
                        Subject
                    </label>
                    <input
                        type="text"
                        value={data.subject}
                        placeholder="Subject"
                        onChange={(e) =>
                            setData({ ...data, subject: e.target.value })
                        }
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-zinc-100 shadow-inner transition-all placeholder:text-zinc-600 focus:ring-1 focus:ring-amber-500/50 focus:outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="ml-1 text-sm font-bold tracking-wider text-zinc-500 capitalize">
                        Message
                    </label>
                    <textarea
                        value={data.text}
                        onChange={(e) =>
                            setData({ ...data, text: e.target.value })
                        }
                        placeholder="Message"
                        className="min-h-[280px] w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-100 shadow-inner transition-all placeholder:text-zinc-600 focus:ring-1 focus:ring-amber-500/50 focus:outline-none"
                    />
                </div>

                <div className="mt-2 flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="w-full sm:w-auto">
                        <FileUpload onFileChange={handleFile} />
                    </div>

                    <button
                        type="button"
                        onClick={handleSending}
                        disabled={load}
                        className="w-full cursor-pointer rounded-xl bg-amber-500 px-8 py-3 font-bold tracking-wider text-zinc-950 capitalize shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all hover:bg-amber-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                        {load ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="h-5 w-5 animate-spin text-zinc-950"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                                Dispatching...
                            </span>
                        ) : (
                            "Send Mails"
                        )}
                    </button>
                </div>

                {message && (
                    <div
                        className={`mt-4 rounded-lg border px-4 py-2 text-center text-sm ${message.toLowerCase().includes("error") || message.toLowerCase().includes("fail") ? "border-red-500/20 bg-red-500/10 text-red-400" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"}`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Mailer;
