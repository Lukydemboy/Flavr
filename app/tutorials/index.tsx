import { ChevronRightIcon } from '@/components/icons/ChevronRight';
import { Page, StyledText } from '@/components/ui';
import { useUser } from '@/queries/user';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import InstagramIcon from '@/components/icons/logos/Instagram';

export default function TutorialsScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: user } = useUser();

  if (!user) return null;

  return (
    <Page safeAreaTop={false}>
      <View className="gap-y-4">
        <Pressable
          onPress={() => router.push('/tutorials/instagram-import')}
          className="p-2 pl-4 rounded-xl bg-white flex items-center justify-center flex-row pr-6 shadow-sm"
        >
          <View className="flex flex-row gap-x-4 w-full items-center">
            <View className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <InstagramIcon width={24} height={24} color="#32675e" />
            </View>
            <StyledText weight="bold">{t('screen.tutorials.item.instagram.label')}</StyledText>
          </View>
          <ChevronRightIcon width={18} height={18} />
        </Pressable>
      </View>
    </Page>
  );
}
