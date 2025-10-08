import { useTranslation } from 'react-i18next';
import AboutProjectDialog from './AboutProjectDialog';
import { useState } from 'react';

export default function Footer() {
    const { t } = useTranslation()
    const [aboutOpen, setAboutOpen] = useState(false);

    return (
        <>
            <footer className="footer">
                <span>© {new Date().getFullYear()} Piotr Greń. {t('footer.copyright')}</span>
                <button
                    className="text-zinc-500 hover:text-red-600 transition underline"
                    onClick={() => {setAboutOpen(true); document.body.style.overflow = "hidden";}}
                >
                    {t("about.link")}
                </button>
            </footer>
            <AboutProjectDialog isOpen={aboutOpen} onClose={() => {setAboutOpen(false); document.body.style.overflow = "auto";}} />
        </>
    );
}