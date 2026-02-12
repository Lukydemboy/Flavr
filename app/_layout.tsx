import { SplashScreen, Stack, useRouter } from 'expo-router';
import {
  Nunito_200ExtraLight,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  useFonts,
} from '@expo-google-fonts/nunito';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from '@/context/authContext';
import { configureAxios } from '@/utils/requests/requests';
import { ShareIntentProvider } from 'expo-share-intent';
import AppHeader from '@/components/headers/AppHeader';
import { StorageKeys, useStorageState } from '@/hooks/storage';
import { useNotificationObserver } from '@/hooks/notification-observer';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import '../global.css';

configureAxios();

export default function RootLayout() {
  const { t } = useTranslation();
  const router = useRouter();
  const [[isLoadingInitialLanguage, initialLanguage]] = useStorageState(StorageKeys.Language);

  useNotificationObserver();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
  );

  useEffect(() => {
    if (!isLoadingInitialLanguage) {
      if (initialLanguage && initialLanguage !== i18n.language) {
        i18n.changeLanguage(initialLanguage);
      }
    }
  }, [isLoadingInitialLanguage, initialLanguage]);

  const [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  useEffect(() => {
    if (fontsLoaded && !isLoadingInitialLanguage) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoadingInitialLanguage, router]);

  if (!fontsLoaded || isLoadingInitialLanguage) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ShareIntentProvider>
        <SessionProvider>
          <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="share-intent" options={{ headerShown: false }} />
              <Stack.Screen name="start" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="mail-sent" options={{ headerShown: false }} />
              <Stack.Screen name="complete-profile" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="recipes/[id]/index" options={{ headerShown: false }} />
              <Stack.Screen
                name="recipes/[id]/share"
                options={{
                  headerShown: true,
                  header: () => <AppHeader title={t('screen.shareRecipe.title')} />,
                }}
              />
              <Stack.Screen
                name="recipes/create/create"
                options={{
                  headerShown: true,
                  header: () => <AppHeader title={t('screen.create.title')} />,
                }}
              />
              <Stack.Screen
                name="recipes/create/image"
                options={{
                  headerShown: true,
                  header: () => <AppHeader title={t('screen.create.title')} fallbackBackscreen={'/(tabs)'} />,
                }}
              />
              <Stack.Screen
                name="recipes/create/link"
                options={{
                  headerShown: true,
                  header: () => <AppHeader title={t('screen.create.title')} fallbackBackscreen={'/(tabs)'} />,
                }}
              />
              <Stack.Screen
                name="groups/create"
                options={{
                  headerShown: true,
                  header: () => (
                    <AppHeader title={t('screen.createGroups.title')} fallbackBackscreen={'/(tabs)/groups'} />
                  ),
                }}
              />
              <Stack.Screen
                name="groups/[id]/index"
                options={{
                  headerShown: true,
                  header: props => (
                    <AppHeader title={props.options.title ?? ''} fallbackBackscreen={'/(tabs)/groups'} {...props} />
                  ),
                }}
              />
              <Stack.Screen
                name="groups/[id]/invite"
                options={{
                  headerShown: true,
                  header: props => (
                    <AppHeader title={t('screen.groupInvite.title')} fallbackBackscreen={'/(tabs)/groups'} {...props} />
                  ),
                }}
              />
              <Stack.Screen
                name="settings/edit-profile"
                options={{
                  headerShown: true,
                  header: () => (
                    <AppHeader
                      title={t('screen.settings.screen.editProfile.title')}
                      fallbackBackscreen={'/(tabs)/settings'}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="settings/dietary-preferences"
                options={{
                  headerShown: true,
                  header: () => (
                    <AppHeader
                      title={t('screen.settings.screen.dietaryPreferences.title')}
                      fallbackBackscreen={'/(tabs)/settings'}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="settings/allergies"
                options={{
                  headerShown: true,
                  header: () => (
                    <AppHeader
                      title={t('screen.settings.screen.allergies.title')}
                      fallbackBackscreen={'/(tabs)/settings'}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="settings/notifications"
                options={{
                  headerShown: true,
                  header: () => (
                    <AppHeader
                      title={t('screen.settings.screen.notifications.title')}
                      fallbackBackscreen={'/(tabs)/settings'}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="settings/language"
                options={{
                  headerShown: true,
                  header: () => (
                    <AppHeader
                      title={t('screen.settings.screen.language.title')}
                      fallbackBackscreen={'/(tabs)/settings'}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="settings/help-center"
                options={{
                  headerShown: true,
                  header: () => (
                    <AppHeader
                      title={t('screen.settings.screen.helpCenter.title')}
                      fallbackBackscreen={'/(tabs)/settings'}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="support/index"
                options={{
                  headerShown: true,
                  header: () => <AppHeader title={t('screen.support.title')} fallbackBackscreen={'/(tabs)/settings'} />,
                }}
              />
              <Stack.Screen
                name="tutorials/index"
                options={{
                  headerShown: true,
                  header: () => (
                    <AppHeader title={t('screen.tutorials.title')} fallbackBackscreen={'/(tabs)/settings'} />
                  ),
                }}
              />
              <Stack.Screen
                name="tutorials/instagram-import"
                options={{
                  headerShown: true,
                  header: () => (
                    <AppHeader title={t('screen.tutorials.instagramImport.title')} fallbackBackscreen={'/(tabs)'} />
                  ),
                }}
              />
            </Stack>
          </SafeAreaProvider>
        </SessionProvider>
      </ShareIntentProvider>
    </QueryClientProvider>
  );
}
