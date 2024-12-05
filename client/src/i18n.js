import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de.json'; // Adjust the path if necessary
import en from './locales/en.json'; // Adjust the path if necessary

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Default language
    lng: 'en', // Initial language
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
