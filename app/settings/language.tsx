import GlobeIcon from '@/components/icons/Globe';
import { ActionButton, Page, StyledText } from '@/components/ui';
import { Language } from '@/domain/enums/language.enum';
import { StorageKeys, useStorageState } from '@/hooks/storage';
import { useUpdateUser } from '@/queries/user';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View, Image } from 'react-native';

export default function SettingsLanguageScreen() {
  const [[isLoadingLanguageState, language]] = useStorageState<Language>(StorageKeys.Language);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>();
  const { t } = useTranslation();
  const router = useRouter();

  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  useEffect(() => {
    if (!isLoadingLanguageState) {
      setSelectedLanguage(language ?? Language.English);
    }
  }, [isLoadingLanguageState, language]);

  return (
    <Page scrollEnabled={false}>
      <ScrollView>
        <StyledText className="text-xl mb-4" weight="black">
          {t('screen.settings.screen.language.languageSelection.title')}
        </StyledText>
        <View className="flex gap-y-2">
          {Object.values(Language).map(value => (
            <Pressable
              key={value}
              onPress={() => setSelectedLanguage(value)}
              className="flex flex-row items-center bg-white p-4 rounded-xl gap-x-4 shadow-sm"
            >
              {getFlagIcon(value)}
              <View>
                <StyledText className="text-base" weight="bold">
                  {t(`screen.settings.screen.language.languageSelection.options.${value}.label`)}
                </StyledText>
                <StyledText className="text-slate-500 text-sm">
                  {t(`screen.settings.screen.language.languageSelection.options.${value}.labelEnglish`)}
                </StyledText>
              </View>
              <View className="ml-auto">
                {value === selectedLanguage ? (
                  <View className="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center transition">
                    <View className="w-3 h-3 rounded-full bg-white"></View>
                  </View>
                ) : (
                  <View className="w-7 h-7 rounded-full border-2 border-slate-300 transition"></View>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <ActionButton
        viewClassName="mt-auto"
        isLoading={isPending}
        disabled={isPending}
        onPress={() => {
          if (!selectedLanguage) return;
          updateUser({ preferences: { language: selectedLanguage } }).then(() => router.back());
        }}
        text={t('screen.settings.screen.language.action.submit')}
      />
    </Page>
  );
}

const getFlagIcon = (language: Language) => {
  switch (language) {
    case 'en':
      return <Image className="w-8 h-5 rounded-xs" source={require('../../assets/flags/en.webp')} />;
    case 'fr':
      return <Image className="w-8 h-5 rounded-xs" source={require('../../assets/flags/fr.webp')} />;
    case 'nl':
      return <Image className="w-8 h-5 rounded-xs" source={require('../../assets/flags/nl.webp')} />;
    case 'es':
      return <Image className="w-8 h-5 rounded-xs" source={require('../../assets/flags/es.webp')} />;
    case 'de':
      return <Image className="w-8 h-5 rounded-xs" source={require('../../assets/flags/de.webp')} />;
    default:
      return <GlobeIcon width={24} height={24} color="#32675e" />;
  }
};
