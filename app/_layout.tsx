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
import '../global.css';
import i18n from '../i18n';

configureAxios();

export default function RootLayout() {
  const router = useRouter();
  const [[isLoadingInitialLanguage, initialLanguage]] = useStorageState(StorageKeys.Language);
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
            <Stack>
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
                  header: () => <AppHeader title={'Share recipe'} />,
                }}
              />
              <Stack.Screen
                name="recipes/create/create"
                options={{
                  header: () => <AppHeader title={'Create recipe'} />,
                }}
              />
              <Stack.Screen
                name="recipes/create/image"
                options={{
                  header: () => <AppHeader title={'Generate recipe'} fallbackBackscreen={'/(tabs)/recipes'} />,
                }}
              />
              <Stack.Screen
                name="recipes/create/link"
                options={{
                  header: () => <AppHeader title={'Generate recipe'} fallbackBackscreen={'/(tabs)/recipes'} />,
                }}
              />
              <Stack.Screen
                name="groups/create"
                options={{
                  header: () => <AppHeader title={'Create group'} fallbackBackscreen={'/(tabs)/groups'} />,
                }}
              />
              <Stack.Screen
                name="settings/language"
                options={{
                  header: () => <AppHeader title={'Language'} fallbackBackscreen={'/(tabs)/settings'} />,
                }}
              />
            </Stack>
          </SafeAreaProvider>
        </SessionProvider>
      </ShareIntentProvider>
    </QueryClientProvider>
  );
}
