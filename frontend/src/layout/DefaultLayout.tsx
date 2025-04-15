import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DefaultLayout () {
    return (
        <div className="main-layout">
            {/* Navbar, ChatWidget będą tu wstawione itd. */}
            <Navbar />
            <main className="px-4 py-6">
                <Outlet />
            </main>
            {/* Footer */}
            <Footer />
        </div>
    )
}