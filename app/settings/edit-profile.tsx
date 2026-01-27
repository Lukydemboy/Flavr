import { ActionButton, Page, StyledText } from '@/components/ui';
import { Avatar } from '@/components/ui/Avatar';
import ImagePicker from '@/components/ui/ImagePicker';
import { InputField } from '@/components/ui/InputField';
import { useUpdateUser, useUpdateUserImage, useUser } from '@/queries/user';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View } from 'react-native';

export default function SettingsEditProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: user } = useUser();
  const [bio, setBio] = useState<string>(user?.bio || '');

  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
  const { mutateAsync: updateUserImage, isPending: isUpdatingImage } = useUpdateUserImage();

  if (!user) return null;

  return (
    <Page scrollEnabled={false}>
      <ScrollView className="shrink">
        <View className="flex items-center justify-center mb-8">
          <View className="relative w-full">
            <ImagePicker
              className="w-full"
              onImagePicked={async image => await updateUserImage({ image })}
              preSelectedImage={user.image ?? undefined}
            />
          </View>
          <StyledText className="mt-4 text-center text-lg font-bold" weight="bold">
            {user.username}
          </StyledText>
        </View>

        <StyledText className="text-sm left-4 mb-2" weight="bold">
          {t('screen.settings.screen.editProfile.form.email.label')}
        </StyledText>
        <InputField
          value={user.email}
          disabled
          className="opacity-50 mb-4"
          onChangeText={() => new Error('Function not implemented.')}
        />

        <StyledText className="text-sm left-4 mb-2" weight="bold">
          {t('screen.settings.screen.editProfile.form.bio.label')}
        </StyledText>
        <InputField
          value={bio || ''}
          multiline
          placeholder={t('screen.settings.screen.editProfile.form.bio.placeholder')}
          onChangeText={(text: string) => setBio(text)}
        />
      </ScrollView>

      <ActionButton
        viewClassName="mt-auto pt-2"
        isLoading={isUpdatingImage || isUpdatingUser}
        disabled={isUpdatingImage || isUpdatingUser}
        onPress={() => updateUser({ bio: bio ?? null }).then(() => router.back())}
        text={t('screen.settings.screen.editProfile.action.submit')}
      />
    </Page>
  );
}
