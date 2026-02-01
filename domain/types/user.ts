import { ImageSource } from 'react-native';
import { Language } from '../enums/language.enum';
import { Asset } from './asset';

export type NotificationPreferences = {
  recipeShares: boolean;
  recipeLikes: boolean;
  recipeComments: boolean;
  groupInvitations: boolean;
  recipeTranslated: boolean;
};

export type User = {
  id: string;
  email: string;
  username: string;
  language: Language;
  image: Asset | null;
  bio: string | null;
  pushToken: string | null;
  preferences?: {
    language?: Language;
    notifications?: NotificationPreferences;
  };
};

export type UpdateUser = {
  email: string;
  username: string;
  bio: string | null;
  pushToken: string | null;
  preferences: {
    language?: Language;
    notifications?: NotificationPreferences;
  };
};

export type UpdateUserImage = {
  image: ImageSource | null;
};
