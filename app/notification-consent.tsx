import { ActionButton, Page, StyledText } from '@/components/ui';
import { useUpdateUser, useUser } from '@/queries/user';
import { PushNotifications } from '@/utils/push-notifications/push-notifications';
import { Redirect, useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useCallback } from 'react';
import { Pressable, View } from 'react-native';

export default function NotificationConsentScreen() {
  const router = useRouter();
  const { data: user } = useUser();
  const { mutateAsync: updateUser } = useUpdateUser();

  if (!user) return <Redirect href="/login" />;

  const registerPushtoken = useCallback(() => {
    PushNotifications.registerForPushNotificationsAsync()
      .then(async pushToken => {
        if (pushToken && user?.pushToken !== pushToken) {
          await updateUser({ pushToken });
        }
      })
      .catch((error: any) => console.log('something went wrong when registering for push notifications', error))
      .finally(() => router.replace('/(tabs)'));
  }, []);

  return (
    <Page safeAreaTop>
      <View className="grow items-center pt-8">
        <View className="w-68 h-68 rounded-full bg-orange-100 items-center justify-center">
          <LottieView
            source={require('../assets/animation/notification-bell.json')}
            style={{ width: 250, height: 250 }}
            autoPlay
            loop
          />
        </View>

        <StyledText className="text-xl mt-8" weight="black">
          Enable push notifications
        </StyledText>

        <StyledText className="text-center text-slate-500 mt-8 w-11/12 mx-auto" style={{ lineHeight: 24 }}>
          Enable notifications to stay up to date with events like new recipes from your friends, likes and comments on
          your recipes.
        </StyledText>
      </View>
      <ActionButton size="large" text="Allow" onPress={registerPushtoken} />
      <Pressable onPress={() => router.replace('/(tabs)')}>
        <StyledText className="text-center text-sm text-gray-500 mt-4">Maybe later</StyledText>
      </Pressable>
    </Page>
  );
}
