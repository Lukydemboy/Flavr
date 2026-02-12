import { Redirect, useRouter } from 'expo-router';
import { useStorageState } from '@/hooks/storage';
import { useShareIntentContext } from 'expo-share-intent';
import { useEffect } from 'react';
import * as packageJson from '../package.json';
import { useAppConfig } from '@/queries/app-config';

export default function IndexScreen() {
  const [[isLoadingSession, session]] = useStorageState('session');
  const { data: appConfig, isLoading: isFetchingAppConfig } = useAppConfig();
  const { hasShareIntent } = useShareIntentContext();
  const router = useRouter();

  useEffect(() => {
    if (hasShareIntent && !isLoadingSession) {
      router.replace({ pathname: '/share-intent' });
    }
  }, [hasShareIntent, isLoadingSession, router]);

  if (isLoadingSession || isFetchingAppConfig) return null;

  if (doesAppNeedUpdate(appConfig?.minAppVersion)) {
    return <Redirect href={'/update'} />;
  }

  return <>{session ? <Redirect href="/(tabs)" /> : <Redirect href={'/start'} />}</>;
}

const doesAppNeedUpdate = (minAppVersion?: string) => {
  return minAppVersion && packageJson.version < minAppVersion;
};
