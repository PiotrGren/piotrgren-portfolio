import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiX, FiBook } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactDialog({ isOpen, onClose }: Props) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const email = "piotr.gren02@gmail.com";
  const email2 = "piotrek.gren2002@gmail.com"
  const phone = "+48 725 871 175";
  const location = "35-077 Rzeszów, " + t("contact.country");

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleEmailCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blur tła */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 backdrop-blur-sm"
          />

          {/* Okno dialogowe */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 top-1/3 left-2/5 w-[90%] h-[40%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-6 pt-6 pb-8 shadow-xl flex flex-col justify-start"
          >
            {/* Ikonka w tle */}
            <div className="absolute inset-0 opacity-10 flex justify-end items-center pr-4 pt-10 pointer-events-none">
              <FiBook size={160} />
            </div>

            {/* X zamykający */}
            <button onClick={onClose} className="absolute top-3 right-3 text-zinc-500 hover:text-red-600 transition">
              <FiX size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-8 relative z-10">{t("contact.title") || "Kontakt"}</h2>

            <ul className="space-y-6 relative z-10">
              <li className="flex items-center gap-3">
                <FiMail size={18} />
                <button onClick={handleEmailCopy} className="text-sm text-left hover:underline">
                  {email}
                </button>
              </li>
              <li className="flex items-center gap-3">
                <FiMail size={18} />
                <button onClick={handleEmailCopy} className="text-sm text-left hover:underline">
                  {email2}
                </button>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone size={18} />
                <a href={`tel:${phone}`} className="text-sm hover:underline">{phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <FiMapPin size={18} />
                <a
                  href="https://www.google.pl/maps/place/Rzeszów/@50.0187723,21.8334863,11z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                >
                  {location}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Notyfikacja o skopiowaniu */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-4 left-2/5 -translate-x-1/2 bg-zinc-800 text-white px-4 py-2 rounded-md shadow-md z-50 text-sm"
              >
                {t("contact.copied") || "Skopiowano adres e-mail!"}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
