import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Language } from './domain/enums/language.enum';
import en from './translations/en.json';
import fr from './translations/fr.json';
import nl from './translations/nl.json';
import es from './translations/es.json';
import de from './translations/de.json';
import * as SecureStore from 'expo-secure-store';
import { StorageKeys } from './hooks/storage';

i18n.use(initReactI18next).init({
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
    await SecureStore.setItemAsync(StorageKeys.Language, language);
  } catch {}
};

export const getCurrentLanguage = (): string => {
  return i18n.language;
};

export default i18n;
