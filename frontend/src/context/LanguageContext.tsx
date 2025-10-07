// src/context/LanguageContext.tsx
import React, { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

type LanguageCtx = {
  code: string;
  name: string;
  flag: string;
  changeLanguage: (lng?: string) => Promise<unknown>; // minimalny typ
};

const LanguageContext = createContext<LanguageCtx | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();

  const language: LanguageCtx = {
    code: i18n.language,
    name: getLanguageName(i18n.language),
    flag: getLanguageFlag(i18n.language),
    changeLanguage: i18n.changeLanguage,
  };

  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

// pomocnicze
function getLanguageName(code: string) {
  const map: Record<string, string> = {
    pl: "Polski",
    en: "English",
    es: "Español",
    it: "Italiano",
    de: "Deutsch",
  };
  return map[code] || code;
}

function getLanguageFlag(code: string) {
  const map: Record<string, string> = {
    pl: "https://flagcdn.com/pl.svg",
    en: "https://flagcdn.com/gb.svg",
    es: "https://flagcdn.com/es.svg",
    it: "https://flagcdn.com/it.svg",
    de: "https://flagcdn.com/de.svg",
  };
  return map[code] || "";
}

export default LanguageContext;
