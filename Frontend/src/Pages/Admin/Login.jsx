import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Login = () => {
    const [formData, setFormData] = useState({
        mail: "",
        password: "",
    });
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const setBack = () => {
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoad(true);
        try {
            const response = await axios.post(
                "http://localhost:3000/api/admin/login",
                formData,
            );
            setMessage(response.data.message);

            sessionStorage.setItem("isAdmin", "true");
            sessionStorage.setItem("adminMail", formData.mail);

            setTimeout(() => navigate("/admin/dashboard"), 1500);
        } catch (error) {
            setMessage(error.response?.data?.message || "Login Failed");
        } finally {
            setLoad(false);
            setBack();
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
            <Header />

            <main className="flex flex-1 items-center justify-center px-4 py-12">
                <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-[0_0_50px_-12px_rgba(251,191,36,0.1)] backdrop-blur-sm">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-100">
                            Admin Login
                        </h2>
                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col gap-5"
                    >
                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-xs font-bold tracking-wider text-zinc-500 capitalize">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="mail"
                                required
                                value={formData.mail}
                                onChange={handleChange}
                                placeholder="Enter Mail"
                                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-zinc-100 transition-all placeholder:text-zinc-600 focus:ring-1 focus:ring-amber-500/50 focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-xs font-bold tracking-wider text-zinc-500 capitalize">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-zinc-100 transition-all placeholder:text-zinc-600 focus:ring-1 focus:ring-amber-500/50 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={load}
                            className="mt-2 w-full cursor-pointer rounded-xl bg-amber-500 py-3 font-bold tracking-wider text-zinc-950 capitalize shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all hover:bg-amber-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {load ? "Authenticating..." : "Login"}
                        </button>
                    </form>

                    {message && (
                        <div
                            className={`mt-6 rounded-lg border px-4 py-2 text-center text-sm ${message.toLowerCase().includes("success") ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-red-500/20 bg-red-500/10 text-red-400"}`}
                        >
                            {message}
                        </div>
                    )}

                    <p className="mt-8 text-center text-sm text-zinc-500">
                        Doesn't Have Account Already?{" "}
                        <Link
                            to="/admin/signup"
                            className="font-semibold text-amber-500 hover:text-amber-400"
                        >
                            Signup
                        </Link>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Login;
