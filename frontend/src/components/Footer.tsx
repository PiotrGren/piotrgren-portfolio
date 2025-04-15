export default function Footer() {
    return (
        <footer className="bg-zinc-100 dark:bg-zinc-800 py-6 text-center mt-12 text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Piotr Greń. Wszelkie prawa zastrzeżone.
        </footer>
    )
}