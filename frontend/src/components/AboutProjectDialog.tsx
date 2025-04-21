import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTerminal } from "react-icons/fi";
import { SiVite, SiReact, SiTypescript, SiTailwindcss, SiFlask, SiSqlite, SiDocker, SiMeta } from "react-icons/si";
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
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="about-dialog absolute z-50 top-1/4 right-1/3 md:right-auto"
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
                                    <TechIcon icon={<SiVite size={32} />} name="Vite" link="https://vitejs.dev/" />
                                    <TechIcon icon={<SiReact size={32} />} name="React" link="https://react.dev/" />
                                    <TechIcon icon={<SiTypescript size={32} />} name="TypeScript" link="https://www.typescriptlang.org/" />
                                    <TechIcon icon={<SiTailwindcss size={32} />} name="TailwindCSS" link="https://tailwindcss.com/" />
                                </div>   
                            </div>

                            {/* Backend */}
                            <div>
                                <h3 className="font-semibold mb-2">Backend</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <TechIcon icon={<SiFlask size={32} />} name="Flask" link="https://flask.palletsprojects.com/" />
                                    <TechIcon icon={<SiSqlite size={32} />} name="SQLite" link="https://sqlite.org/" />
                                    <TechIcon icon={<SiMeta size={32} />} name="Meta LLaMA" link="https://ai.meta.com/llama/" />
                                </div>
                            </div>

                            {/* Konteneryzacja */}
                            <div>
                                <h3 className="font-semibold mb-2">{t("about.contenerization")}</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <TechIcon icon={<SiDocker size={32} />} name="Docker" link="https://www.docker.com/" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
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
            <div className="absolute bottom=[-1.8rem] left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition z-50 pointer-events-none whitespace-nowrap">
                {name}
            </div>
        </a>
    );
}