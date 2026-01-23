import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Language } from './domain/enums/language.enum';
import en from './translations/en.json';
import fr from './translations/fr.json';
import nl from './translations/nl.json';
import es from './translations/es.json';
import de from './translations/de.json';
import * as SecureStore from 'expo-secure-store';

export const LANGUAGE_STORAGE_KEY = 'language';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: Language.English,
    resources: {
      [Language.English]: { translation: en },
      [Language.French]: { translation: fr },
      [Language.Dutch]: { translation: nl },
      [Language.Spanish]: { translation: es },
      [Language.German]: { translation: de },
    },
  });

export const changeLanguage = async (language: Language): Promise<void> => {
  await i18n.changeLanguage(language);

  try {
    await SecureStore.setItemAsync(LANGUAGE_STORAGE_KEY, language);
  } catch {}
};

export const getCurrentLanguage = (): string => {
  return i18n.language;
};

export default i18n;
