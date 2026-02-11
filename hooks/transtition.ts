import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';

export function useIsPageReady() {
  const [isReady, setIsReady] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      setIsReady(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  return isReady;
}
