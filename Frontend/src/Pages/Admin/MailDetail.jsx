import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Calendar, Users, Mail as MailIcon, ChevronLeft } from "lucide-react";

const MailDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mail, setMail] = useState(null);
    const [load, setLoad] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const isAdmin = sessionStorage.getItem("isAdmin");
        if (!isAdmin) {
            navigate("/admin");
            return;
        }

        const fetchMail = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/admin/mail/${id}`,
                );
                setMail(response.data.mail);
            } catch (error) {
                setMessage(
                    error.response?.data?.message ||
                        "Failed to fetch mail details",
                );
            } finally {
                setLoad(false);
            }
        };

        fetchMail();
    }, [id, navigate]);

    return (
        <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
            <Header />

            <main className="flex flex-1 items-center justify-center px-4 py-8 md:px-8 lg:px-16">
                <div className="w-full max-w-4xl">
                    {load ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"></div>
                        </div>
                    ) : mail ? (
                        <div className="space-y-8">
                            <header className="space-y-4">
                                <h2 className="text-4xl font-bold tracking-tight text-zinc-100">
                                    {mail.subject}
                                </h2>
                                <div className="flex flex-wrap gap-6 text-sm text-zinc-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-amber-500" />
                                        <span>
                                            {new Date(
                                                mail.createdAt,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-amber-500" />
                                        <span>
                                            {mail.mails.length} Recipients
                                        </span>
                                    </div>
                                </div>
                            </header>

                            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-xl backdrop-blur-sm md:p-8">
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-100">
                                    <MailIcon className="h-5 w-5 text-amber-500" />
                                    Message Content
                                </h3>
                                <div
                                    className="prose prose-invert max-w-none text-zinc-300"
                                    dangerouslySetInnerHTML={{
                                        __html: mail.text,
                                    }}
                                />
                            </section>

                            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-xl backdrop-blur-sm md:p-8">
                                <h3 className="mb-4 text-lg font-semibold text-zinc-100">
                                    Recipients List
                                </h3>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {mail.mails.map((email, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-zinc-400"
                                        >
                                            {email}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div className="flex h-64 flex-col items-center justify-center gap-2 text-center text-zinc-500">
                            <p className="text-xl font-bold text-zinc-300">
                                Mail Not Found
                            </p>
                            <p className="max-w-xs">{message}</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MailDetail;
