import HeartIcon from '@/components/icons/Heart';
import MessageBubbleIcon from '@/components/icons/MessageBubble';
import PeopleIcon from '@/components/icons/People';
import ShareIcon from '@/components/icons/Share';
import TranslateIcon from '@/components/icons/Translate';
import { CircleLoader } from '@/components/loaders';
import { ActionButton, Page, StyledText } from '@/components/ui';
import { NotificationPreferences } from '@/domain/types/user';
import { useUpdateUser, useUser } from '@/queries/user';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Switch, View } from 'react-native';

const DEFAULT_PREFERENCES: NonNullable<NotificationPreferences> = {
  recipeShares: true,
  recipeLikes: true,
  recipeComments: true,
  groupInvitations: true,
  recipeTranslated: true,
};
type NotificationKey = keyof NonNullable<NotificationPreferences>;

const options: {
  id: NotificationKey;
  icon: 'share' | 'group' | 'comment' | 'heart' | 'translations';
  title: string;
  description: string;
}[] = [
  {
    id: 'recipeShares',
    icon: 'share',
    title: 'screen.settings.screen.notifications.option.share.title',
    description: 'screen.settings.screen.notifications.option.share.description',
  },
  {
    id: 'groupInvitations',
    icon: 'group',
    title: 'screen.settings.screen.notifications.option.invites.title',
    description: 'screen.settings.screen.notifications.option.invites.description',
  },
  {
    id: 'recipeComments',
    icon: 'comment',
    title: 'screen.settings.screen.notifications.option.comment.title',
    description: 'screen.settings.screen.notifications.option.comment.description',
  },
  {
    id: 'recipeLikes',
    icon: 'heart',
    title: 'screen.settings.screen.notifications.option.like.title',
    description: 'screen.settings.screen.notifications.option.like.description',
  },
  {
    id: 'recipeTranslated',
    icon: 'translations',
    title: 'screen.settings.screen.notifications.option.recipeTranslated.title',
    description: 'screen.settings.screen.notifications.option.recipeTranslated.description',
  },
];

export default function SettingsNotificationsScreen() {
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
  const { t } = useTranslation();
  const router = useRouter();

  const { data: user, isLoading } = useUser();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();

  useEffect(() => {
    if (user) {
      const preferences = user.preferences?.notifications || DEFAULT_PREFERENCES;

      setNotificationPreferences(preferences);
    }
  }, [user]);

  if (!user) return null;

  return (
    <Page scrollEnabled={false}>
      <StyledText className="text-sm mb-6 text-slate-500 leading-relaxed">
        {t('screen.settings.screen.notifications.description')}
      </StyledText>

      {isLoading && (
        <View className="items-center">
          <CircleLoader />
        </View>
      )}

      {!isLoading && (
        <ScrollView contentContainerClassName="grow">
          {options.map(option => (
            <View
              key={option.title}
              className="flex-row items-center bg-white rounded-2xl shadow-sm mx-1 p-3 pr-2 mb-2 gap-x-2"
            >
              <View className="flex flex-row items-center gap-x-2 shrink">
                <View className="size-14 bg-primary-100 rounded-2xl flex items-center justify-center">
                  {getIcon(option.icon)}
                </View>
                <View className="shrink">
                  <StyledText className="ml-2 mb-0.5" weight="bold">
                    {t(option.title)}
                  </StyledText>
                  <StyledText className="ml-2 text-slate-500 text-xs" weight="regular">
                    {t(option.description)}
                  </StyledText>
                </View>
              </View>
              <Switch
                className="mt-3.5 ml-auto"
                value={notificationPreferences?.[option.id]}
                trackColor={{ true: '#32675e' }}
                onValueChange={value => {
                  setNotificationPreferences(prev => ({
                    ...(prev ?? DEFAULT_PREFERENCES),
                    [option.id]: value,
                  }));
                }}
              />
            </View>
          ))}
        </ScrollView>
      )}

      <ActionButton
        viewClassName="mt-auto pt-2"
        isLoading={isUpdatingUser}
        disabled={isUpdatingUser}
        onPress={() =>
          updateUser({
            preferences: { notifications: { ...user?.preferences?.notifications, ...notificationPreferences } },
          }).then(() => router.back())
        }
        text={t('screen.settings.screen.notifications.action.submit')}
      />
    </Page>
  );
}

const getIcon = (icon: string) => {
  switch (icon) {
    case 'share':
      return <ShareIcon width={22} height={22} color="#32675e" />;
    case 'group':
      return <PeopleIcon width={24} height={24} color="#32675e" />;
    case 'comment':
      return <MessageBubbleIcon width={24} height={24} color="#32675e" />;
    case 'heart':
      return <HeartIcon width={24} height={24} color="#32675e" />;
    case 'translations':
      return <TranslateIcon width={24} height={24} color="#32675e" />;
    default:
      return null;
  }
};
