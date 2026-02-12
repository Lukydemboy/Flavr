import { ActionButton, Page, StyledText } from '@/components/ui';
import { env } from '@/utils/env/env';
import { useTranslation } from 'react-i18next';
import { Linking, Platform, View } from 'react-native';

export default function UpdateScreen() {
  const { t } = useTranslation();

  return (
    <Page safeAreaTop contentContainerClassName="flex justify-center">
      <View className="flex flex-col gap-y-4 bg-white rounded-lg mx-auto p-4 shadow">
        <StyledText className="text-xl" weight="black">
          {t('screen.update.title')}
        </StyledText>
        <StyledText className="text-slate-500">{t('screen.update.description')}</StyledText>
        <ActionButton
          onPress={() =>
            Platform.OS === 'ios' ? Linking.openURL(env.links.appStore) : Linking.openURL(env.links.playStore)
          }
          text={t('screen.update.action.update.label')}
        />
      </View>
    </Page>
  );
}
