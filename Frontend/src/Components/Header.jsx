const Header = () => {
    return (
        <header className="sticky top-0 z-50 flex h-[10%] w-full items-center justify-center border-b border-zinc-800 bg-zinc-950/80 px-8 backdrop-blur-md">
            <h1 className="bg-linear-to-r from-amber-200 via-amber-500 to-amber-200 bg-clip-text text-3xl font-bold text-transparent drop-shadow-sm">
                Multi - Recipient Mailer
            </h1>
        </header>
    );
};

export default Header;
