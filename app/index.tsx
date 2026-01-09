import { Redirect, useRouter } from 'expo-router';
import { useStorageState } from '@/hooks/storage';
import { useShareIntentContext } from 'expo-share-intent';
import { useEffect } from 'react';

export default function IndexScreen() {
  const [[isLoadingSession, session]] = useStorageState('session');
  const { hasShareIntent } = useShareIntentContext();
  const router = useRouter();

  useEffect(() => {
    if (hasShareIntent && !isLoadingSession) {
      router.replace({ pathname: '/share-intent' });
    }
  }, [hasShareIntent, isLoadingSession, router]);

  if (isLoadingSession) return null;

  return <>{session ? <Redirect href="/(tabs)" /> : <Redirect href={'/start'} />}</>;
}
