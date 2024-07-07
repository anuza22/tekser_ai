import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './languages/en.json';
import translationRU from './languages/ru.json';
import translationKZ from './languages/kz.json';

const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  },
  kz: {
    translation: translationKZ
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

