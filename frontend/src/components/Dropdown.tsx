import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

type DropdownItem = {
    label: string;
    to: string;
}

type DropdownProps = {
    title: string;
    items: DropdownItem[];
}

export default function Dropdown({ title, items }: DropdownProps) {
    const [open, setOpen] = useState(false);

    const location = useLocation();
    const isActive = items.some(item => location.pathname.startsWith(item.to));

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                className={clsx(
                    "inline-flex items-center justify-center gap-1 transition-colors hover:text-red-700 w-full",
                    isActive && "text-red-900 font-semibold"
                )}
            >
                <span className="inline-flex items-center gap-1">
                    {title}
                    <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown size={16} />
                    </motion.div>
                </span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 ml-[-32px] z-50 mt-2 w-48 rounded-md bg-white dark:bg-zinc-800 shadow border border-zinc-200 dark:border-zinc-700"
                    >
                        {items.map(({ label, to }) => (
                            <Link
                                key={to}
                                to={to}
                                className="block px-4 py-2 text-sm text-zinc-800 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}