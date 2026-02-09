import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Mail, History, Users, LogOut } from "lucide-react";

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const [load, setLoad] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const setBack = () => {
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    useEffect(() => {
        const isAdmin = sessionStorage.getItem("isAdmin");
        if (!isAdmin) {
            navigate("/admin");
            return;
        }

        const fetchHistory = async () => {
            try {
                const response = await axios.get(
                    "https://multi-recipient-mailer.onrender.com/api/admin/mails",
                );
                setHistory(response.data.history);
                setMessage(response.data.message);
            } catch (error) {
                setMessage(
                    error.response?.data?.message ||
                        "Failed Fetching History From Database",
                );
            } finally {
                setLoad(false);
                setBack();
            }
        };

        fetchHistory();
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/admin");
    };

    return (
        <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
            <Header />

            <main className="flex-1 px-4 py-8 md:px-8 lg:px-16">
                <div className="mx-auto max-w-6xl">
                    <header className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
                                Admin Dashboard
                            </h2>
                            <p className="text-zinc-500">
                                Monitor Your Outreach Performance
                            </p>
                        </div>
                    </header>

                    <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <StatCard
                            icon={<Mail className="h-6 w-6 text-amber-500" />}
                            label="Total Campaigns"
                            value={history.length}
                        />
                        <StatCard
                            icon={<Users className="h-6 w-6 text-amber-500" />}
                            label="Avg Recipients"
                            value={
                                history.length > 0
                                    ? Math.round(
                                          history.reduce(
                                              (acc, item) =>
                                                  acc + item.mails.length,
                                              0,
                                          ) / history.length,
                                      )
                                    : 0
                            }
                        />
                        <StatCard
                            icon={
                                <History className="h-6 w-6 text-amber-500" />
                            }
                            label="Last Activity"
                            value={
                                history.length > 0
                                    ? new Date(
                                          history[history.length - 1]
                                              .createdAt || Date.now(),
                                      ).toLocaleDateString()
                                    : "N/A"
                            }
                        />
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-xl backdrop-blur-sm">
                        <div className="border-b border-zinc-800 p-6">
                            <h3 className="text-lg font-semibold text-zinc-100">
                                Recent Mail History
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            {load ? (
                                <div className="flex h-64 items-center justify-center">
                                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent"></div>
                                </div>
                            ) : history.length > 0 ? (
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-zinc-800 bg-zinc-950/50 text-xs font-bold text-zinc-500 capitalize">
                                            <th className="px-6 py-4">
                                                Subject
                                            </th>
                                            <th className="px-6 py-4 text-center">
                                                Recipients
                                            </th>
                                            <th className="px-6 py-4">
                                                Content Preview
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-800">
                                        {history.map((item) => (
                                            <tr
                                                key={item._id}
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/mail/${item._id}`,
                                                    )
                                                }
                                                className="cursor-pointer transition-colors hover:bg-zinc-800/30"
                                            >
                                                <td className="px-6 py-4 font-medium text-zinc-200">
                                                    {item.subject}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                                                        {item.mails.length}
                                                    </span>
                                                </td>
                                                <td className="max-w-xs truncate px-6 py-4 text-sm text-zinc-500">
                                                    {item.text.replace(
                                                        /<[^>]*>/g,
                                                        "",
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="flex h-64 flex-col items-center justify-center gap-2 text-zinc-500">
                                    <Mail className="h-12 w-12 opacity-20" />
                                    <p>No mail history found</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {message && !load && (
                        <div className="mt-4 text-center text-xs text-zinc-600">
                            {message}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-700">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
            {icon}
        </div>
        <p className="text-sm font-medium text-zinc-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-zinc-100">{value}</p>
    </div>
);

export default Dashboard;
