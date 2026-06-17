import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext();

const supportedLanguages = ['es', 'en'];
const defaultLanguage = 'es';

function loadPersistedLanguage() {
  try {
    const stored = localStorage.getItem('language');
    return supportedLanguages.includes(stored) ? stored : defaultLanguage;
  } catch {
    return defaultLanguage;
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(loadPersistedLanguage);

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch {
      // ignore
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      supportedLanguages,
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
