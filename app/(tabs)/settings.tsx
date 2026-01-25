import BellIcon from '@/components/icons/Bell';
import GlobeIcon from '@/components/icons/Globe';
import { ChevronRightIcon } from '@/components/icons/ChevronRight';
import { ActionButton, Page, StyledText } from '@/components/ui';
import { Avatar } from '@/components/ui/Avatar';
import { useUser } from '@/queries/user';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import TagIcon from '@/components/icons/Tag';
import ForkKnifeIcon from '@/components/icons/ForkKnife';
import WarningIcon from '@/components/icons/Warning';
import QuestionMarkCircleIcon from '@/components/icons/QuestionMarkCircle';
import ShieldIcon from '@/components/icons/Shield';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import packageJson from '../../package.json';
import { useSession } from '@/context/authContext';

const version = packageJson.version;

export default function SettingsScreen() {
  const { signOut } = useSession();
  const { t } = useTranslation();
  const router = useRouter();

  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <Page safeAreaTop className="gap-y-4">
      <View className="p-4 rounded-xl bg-white flex items-center justify-center">
        <Avatar size={120} user={user}></Avatar>
        <StyledText className="text-xl mt-6" weight="black">
          {user.username}
        </StyledText>
        <StyledText className="mt-2 text-center text-slate-400">{user.email}</StyledText>
        <ActionButton
          onPress={() => console.log('test')}
          buttonClassName="w-full"
          viewClassName="w-full mt-4"
          text={t('screen.settings.profile.action.editProfile')}
        />
      </View>

      <View className="mt-8">
        <StyledText className="text-primary-500" weight="bold">
          {t('screen.settings.personalization.title')}
        </StyledText>
        <View className="mt-2 p-2 pl-4 rounded-xl bg-white flex items-center justify-center flex-row pr-6 shadow-sm">
          <View className="flex flex-row gap-x-4 w-full items-center">
            <View className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <TagIcon width={24} height={24} color="#32675e" />
            </View>
            <StyledText weight="bold">{t('screen.settings.personalization.item.preferredTags')}</StyledText>
          </View>
          <ChevronRightIcon width={18} height={18} />
        </View>
        <View className="mt-2 p-2 pl-4 rounded-xl bg-white flex items-center justify-center flex-row pr-6 shadow-sm">
          <View className="flex flex-row gap-x-4 w-full items-center">
            <View className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <ForkKnifeIcon width={24} height={24} color="#32675e" />
            </View>
            <StyledText weight="bold">{t('screen.settings.personalization.item.dietaryPreferences')}</StyledText>
          </View>
          <ChevronRightIcon width={18} height={18} />
        </View>
        <Pressable
          onPress={() => router.push('/settings/allergies')}
          className="mt-2 p-2 pl-4 rounded-xl bg-white flex flex-row items-center justify-center pr-6 shadow-sm"
        >
          <View className="flex flex-row gap-x-4 w-full items-center">
            <View className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <WarningIcon width={24} height={24} color="#32675e" />
            </View>
            <StyledText weight="bold">{t('screen.settings.personalization.item.allergies')}</StyledText>
          </View>
          <ChevronRightIcon width={18} height={18} />
        </Pressable>
      </View>

      <View className="mt-8">
        <StyledText className="text-primary-500" weight="bold">
          {t('screen.settings.appSettings.title')}
        </StyledText>
        <Pressable
          onPress={() => router.push('/settings/language')}
          className="mt-2 p-2 pl-4 rounded-xl bg-white flex items-center justify-center flex-row pr-6 shadow-sm"
        >
          <View className="flex flex-row gap-x-4 w-full items-center">
            <View className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <GlobeIcon width={24} height={24} color="#32675e" />
            </View>
            <StyledText weight="bold">{t('screen.settings.appSettings.item.language')}</StyledText>
          </View>
          <ChevronRightIcon width={18} height={18} />
        </Pressable>
        <View className="mt-2 p-2 pl-4 rounded-xl bg-white flex items-center justify-center flex-row pr-6 shadow-sm">
          <View className="flex flex-row gap-x-4 w-full items-center">
            <View className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <BellIcon width={24} height={24} color="#32675e" />
            </View>
            <StyledText weight="bold">{t('screen.settings.appSettings.item.notifications')}</StyledText>
          </View>
          <ChevronRightIcon width={18} height={18} />
        </View>
        {/*<View className="mt-2 p-2 pl-4 rounded-xl bg-white flex items-center justify-center flex-row pr-6 shadow-sm">
          <View className="flex flex-row gap-x-4 w-full items-center">
            <View className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center"></View>
            <StyledText weight="bold">{t('screen.settings.appSettings.item.theme')}</StyledText>
          </View>
          <ChevronRightIcon width={18} height={18} />
        </View>*/}
      </View>

      <View className="mt-8 pb-4">
        <StyledText className="text-primary-500" weight="bold">
          {t('screen.settings.support.title')}
        </StyledText>
        <View className="mt-2 p-2 pl-4 rounded-xl bg-white flex items-center justify-center flex-row pr-6 shadow-sm">
          <View className="flex flex-row gap-x-4 w-full items-center">
            <View className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <QuestionMarkCircleIcon width={24} height={24} />
            </View>
            <StyledText weight="bold">{t('screen.settings.support.item.helpCenter')}</StyledText>
          </View>
          <ChevronRightIcon width={18} height={18} />
        </View>
        <View className="mt-2 p-2 pl-4 rounded-xl bg-white flex items-center justify-center flex-row pr-6 shadow-sm">
          <View className="flex flex-row gap-x-4 w-full items-center">
            <View className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <ShieldIcon width={24} height={24} color="#32675e" />
            </View>
            <StyledText weight="bold">{t('screen.settings.support.item.privacyPolicy')}</StyledText>
          </View>
          <ChevronRightIcon width={18} height={18} />
        </View>
      </View>

      <Pressable
        onPress={() =>
          signOut().then(() => {
            router.dismissAll();
            router.replace('/');
          })
        }
        className="bg-red-100 p-4 mb-12 rounded-xl"
      >
        <StyledText className="text-center text-rose-600" weight="black">
          Log out
        </StyledText>
      </Pressable>

      <StyledText className="text-center text-slate-500 mb-6">Flavr {version}</StyledText>
    </Page>
  );
}
