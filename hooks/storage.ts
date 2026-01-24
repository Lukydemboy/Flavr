import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useReducer } from 'react';
import { Platform } from 'react-native';

export enum StorageKeys {
  Session = 'session',
  Language = 'language',
}

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value === null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState<T extends string | null>(key: string): UseStateHook<T> {
  const [state, setState] = useAsyncState<T | null>();

  // Get
  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined' && key !== null) setState(localStorage.getItem(key) as T);
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then(value => setState(value as T));
    }
  }, [key]);

  // Set
  const setValue = useCallback(
    (value: string | null) => {
      setStorageItemAsync(key, value).then(() => {
        setState(value as T);
      });
    },
    [key],
  );

  return [state, setValue];
}
