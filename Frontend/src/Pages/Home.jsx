import Header from "../Components/Header";
import Mailer from "../Components/Mailer";
import Footer from "../Components/Footer";

function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">
                <Mailer />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
