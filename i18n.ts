import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Language } from './domain/enums/language.enum';
import en from './translations/en.json';
// import fr from './translations/fr.json';
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: Language.English,
    resources: {
      [Language.English]: { translation: en },
      // [Language.French]: fr,
    },
  });

export default i18n;
