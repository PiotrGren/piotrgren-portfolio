import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { FiExternalLink, FiDownload, FiEye, FiChevronDown } from 'react-icons/fi'
import profile from "../assets/pictures/profile.jpg"
import { useState, useEffect, useRef } from 'react'
import ContactDialog from "../components/ContactDialog";

export default function Home() {
  const { t } = useTranslation()
  const [cvOpen, setCVOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const cvRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cvRef.current && !cvRef.current.contains(event.target as Node)) {
        setCVOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    return(
      <div className="homepage-maindiv">
        {/* Lewa stron: Zdjęcie profilowe */}
        <motion.div
          initial={{ opacity:0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)"}}
          transition={{ duration: 0.5 }}
          className="profilepic-div"
        >
          <img 
            src={profile}
            alt="Profile Picture"
            className="profilepic"
          />
          {/* Fala 
          <img
            src="https://www.svgrepo.com/show/370968/wave-bottom.svg"
            alt="dekoracja"
            className="absolute bottom-0 left-0 w-full opacity-30 animate-fade-in"
          />
          <div className="profilepic-effect" />*/}
        </motion.div>

        {/* Prawa strona: Tekst i przyciski */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="home-infodiv"
        >
          <p className="test-base sm:text-lg text-zinc-500 dark:text-zinc-400">
            {t("homePage.greeting") || "Cześć, jestem"}
          </p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white"
          >
            Piotr Greń
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 font-medium"
          >
            AI & Software Engineer
          </motion.h2>

          {/* Przyciski */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-4"
          >
            {/* Kontakt */}
            <button className="home-contactbutton" onClick={() => setContactOpen(true)}>
              {t("homePage.buttons.contact")}
              <FiExternalLink size={14} />
            </button>

            {/* Moje CV - Dropdown */}
            <div className="relative" ref={cvRef}>
              <button
                onClick={() => setCVOpen(!cvOpen)}
                className="home-cvbutton"
              >
                {t("homePage.buttons.mcv")}
                <motion.div
                  animate={{ rotate: cvOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown size={14} />
                </motion.div>
              </button>
              {cvOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="cv-dropdown"
                >
                  <button className="viewcv-button">
                    {t("homePage.buttons.viewcv")} {/*<FiEye size={14} className="mt-auto mb-auto" />*/}
                  </button>
                  <button className="downloadcv-button">
                    {t("homePage.buttons.downloadcv")} {/*<FiDownload size={14} className="mt-auto mb-auto" />*/}
                  </button>
                </motion.div>
              )}
            </div>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/piotr-gren"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-button"
            >
              LinkedIn <FaLinkedin size={14} />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/PiotrGren"
              target="_blank"
              rel="noopener noreferrer"
              className="github-button"
            >
              GitHub <FaGithub size={14} />
            </a>
          </motion.div>
        </motion.div>
        <ContactDialog isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    );
  }
