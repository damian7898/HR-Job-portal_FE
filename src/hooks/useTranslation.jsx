import { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import es from '../locales/es.json';
import en from '../locales/en.json';

const dictionaries = { es, en };

export function useTranslation() {
  const { language } = useLanguage();

  const dictionary = useMemo(() => dictionaries[language] || dictionaries.es, [language]);

  const t = (path, fallback) => {
    if (!path) return fallback || '';
    const parts = path.split('.');
    return parts.reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined), dictionary) ?? fallback ?? path;
  };

  return { t, language };
}
