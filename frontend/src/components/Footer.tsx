import { useTranslation } from 'react-i18next'

export default function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="footer">
            © {new Date().getFullYear()} Piotr Greń. {t('footer.copyright')}
        </footer>
    )
}