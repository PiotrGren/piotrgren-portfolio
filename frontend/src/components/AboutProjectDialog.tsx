import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useRef, useEffect } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AboutProjectDialog({ isOpen, onClose }: Props) {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if ( ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return() => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Blurr tła */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xl"
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-xl sm:w-[80%] h-auto rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-6 pt-6 pb-8 shadow-xl overflow-y-auto max-h-[80vh]"
                    >
                        {/* Ikona w tle - opcjonalne
                        <div className="about-background">
                            <FiTerminal size={160} />
                        </div>
                         */}

                        {/* Zamknięcie */}
                        <button onClick={onClose} className="about-close">
                            <FiX size={20} />
                        </button>

                        {/* Treść */}
                        <h2 className="text-2xl font-bold mb-4 relative z-10">{t("about.title")}</h2>
                        <p className="text-sm mb-6 text-zinc-600 dark:text-zinc-300 relative z-10">
                            {t("about.description")}
                        </p>

                        {/* Kategorie */}
                        <div className="space-y-6 relative z-10">
                            {/* Frontend */}
                            <div>
                                <h3 className="font-semibold mb-2">Frontend</h3>
                                <div className="flex flex-wrap justify-center gap-5">
                                    <TechIcon icon={<img src="https://vitejs.dev/logo.svg" alt="Vite" className="w-8 h-8" />} name="Vite" link="https://vitejs.dev/" />
                                    <TechIcon icon={<img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" className="w-8 h-8" />} name="React" link="https://react.dev/" />
                                    <TechIcon icon={<img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" className="w-8 h-8" />} name="TypeScript" link="https://www.typescriptlang.org/" />
                                    <TechIcon icon={<img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="TailwindCSS" className="w-8 h-8" />} name="TailwindCSS" link="https://tailwindcss.com/" />
                                </div>   
                            </div>

                            {/* Backend */}
                            <div>
                                <h3 className="font-semibold mb-2">Backend</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <TechIcon icon={<img src="https://icon.icepanel.io/Technology/png-shadow-512/Flask.png" alt="Flask" className="w-8 h-8" />} name="Flask" link="https://flask.palletsprojects.com/" />
                                    <TechIcon icon={<img src="https://www.vectorlogo.zone/logos/mysql/mysql-official.svg" alt="MySQL" className="w-8 h-8" />} name="MySQL" link="https://www.mysql.com/" />
                                    <TechIcon icon={<img src="https://images.seeklogo.com/logo-png/42/2/meta-icon-new-facebook-2021-logo-png_seeklogo-424014.png" alt="Meta" className="w-8 h-8" />} name="Meta Llama" link="https://ai.meta.com/llama/" />
                                </div>
                            </div>

                            {/* Konteneryzacja */}
                            <div>
                                <h3 className="font-semibold mb-2">{t("about.contenerization")}</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <TechIcon icon={<img src="https://cdn.simpleicons.org/docker/2496ED" alt="Docker" className="w-8 h-8" />} name="Docker" link="https://www.docker.com/" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

function TechIcon({ icon, name, link }: {icon: React.ReactNode; name: string; link: string}) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
        >
            <div className="text-2xl hover:scale-110 transition">{icon}</div>
            <div className="absolute bottom=[-2rem] left-1/2 -translate-x-1/2 translate-y-1 bg-zinc-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition z-50 pointer-events-none whitespace-nowrap">
                {name}
            </div>
        </a>
    );
}