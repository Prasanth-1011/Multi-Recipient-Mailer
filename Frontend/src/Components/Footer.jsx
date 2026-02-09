const Footer = () => {
    return (
        <footer className="flex h-20 w-full items-center justify-center border-t border-zinc-800 bg-zinc-950/50">
            <div className="flex gap-8 text-sm text-zinc-500">
                <p>&copy; {new Date().getFullYear()}</p>
                <span className="font-medium text-amber-500/80">
                    Multi - Recipient Mailer
                </span>
                <p>Elegant Mail App</p>
            </div>
        </footer>
    );
};

export default Footer;
