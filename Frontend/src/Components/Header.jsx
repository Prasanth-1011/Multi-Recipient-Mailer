import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, House, LogOut, LayoutDashboard } from "lucide-react";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem("isAdmin");
    const isLoginPage =
        location.pathname === "/admin" || location.pathname === "/admin/signup";
    const isDashboard = location.pathname === "/admin/dashboard";
    const isMailDetail = location.pathname.startsWith("/admin/mail/");

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/admin");
    };

    return (
        <header className="sticky top-0 z-50 flex h-20 w-full items-center justify-center border-b border-zinc-800 bg-zinc-950/80 px-4 backdrop-blur-md md:px-12">
            <h1 className="bg-linear-to-r from-amber-200 via-amber-500 to-amber-200 bg-clip-text text-2xl font-bold text-transparent drop-shadow-sm md:text-3xl">
                Multi - Recipient Mailer
            </h1>

            {isLoginPage && (
                <div className="absolute right-4 md:right-12">
                    <Link
                        to="/"
                        className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-xs font-bold text-zinc-400 transition-all hover:bg-zinc-800 hover:text-amber-500"
                    >
                        <House className="h-4 w-4" />
                        <span className="hidden sm:inline">Home</span>
                    </Link>
                </div>
            )}

            {!isLoginPage && (
                <div className="absolute right-4 md:right-12">
                    {isDashboard ? (
                        <button
                            onClick={handleLogout}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-xs font-bold text-zinc-400 transition-all hover:bg-zinc-800 hover:text-red-400"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    ) : isMailDetail ? (
                        <Link
                            to="/admin/dashboard"
                            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-xs font-bold text-zinc-400 transition-all hover:bg-zinc-800 hover:text-amber-500"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                    ) : (
                        <Link
                            to={isAdmin ? "/admin/dashboard" : "/admin"}
                            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-xs font-bold text-zinc-400 transition-all hover:bg-zinc-800 hover:text-amber-500"
                        >
                            <User className="h-4 w-4" />
                            <span className="hidden sm:inline">
                                {isAdmin ? "Dashboard" : "Admin Login"}
                            </span>
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
