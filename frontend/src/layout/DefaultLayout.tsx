import { Outlet } from "react-router-dom";

export default function DefaultLayout () {
    return (
        <div className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white">
            {/* Navbar, ChatWidget będą tu wstawione itd. */}
            <main className="px-4 py-6">
                <Outlet />
            </main>
            {/* Footer */}
        </div>
    )
}