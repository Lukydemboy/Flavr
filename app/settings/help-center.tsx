import { ChevronRightIcon } from '@/components/icons/ChevronRight';
import { Page, StyledText } from '@/components/ui';
import { useDeleteUser, useUser } from '@/queries/user';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { useSession } from '@/context/authContext';
import TrashCanIcon from '@/components/icons/TrashCan';
import { ConfirmationSheet, ConfirmationSheetRef } from '@/components/sheets/ConfirmationSheet';
import { useRef } from 'react';
import OwlIcon from '@/components/icons/Owl';

export default function HelpCenterScreen() {
  const { signOut } = useSession();
  const { t } = useTranslation();
  const router = useRouter();
  const confirmationSheetRef = useRef<ConfirmationSheetRef>(null);

  const { data: user } = useUser();
  const { mutateAsync: deleteUser, isPending } = useDeleteUser();

  if (!user) {
    return null;
  }

  return (
    <Page safeAreaTop={false}>
      <View className="gap-y-4">
        <Pressable
          onPress={() => router.push('/tutorials')}
          className="p-2 pl-4 rounded-xl bg-white flex items-center justify-center flex-row pr-6 shadow-sm"
        >
          <View className="flex flex-row gap-x-4 w-full items-center">
            <View className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <OwlIcon width={24} height={24} color="#32675e" />
            </View>
            <StyledText weight="bold">{t('screen.settings.screen.helpCenter.item.tutorials.label')}</StyledText>
          </View>
          <ChevronRightIcon width={18} height={18} />
        </Pressable>
        <Pressable
          onPress={() => confirmationSheetRef.current?.open()}
          className="p-2 pl-4 rounded-xl bg-white flex items-center justify-center flex-row pr-6 shadow-sm"
        >
          <View className="flex flex-row gap-x-4 w-full items-center">
            <View className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <TrashCanIcon width={24} height={24} color="#dc2626" />
            </View>
            <StyledText weight="bold">{t('screen.settings.screen.helpCenter.item.deleteAccount.label')}</StyledText>
          </View>
          <ChevronRightIcon width={18} height={18} />
        </Pressable>
      </View>

      <ConfirmationSheet
        ref={confirmationSheetRef}
        onConfirm={() => deleteUser().then(() => signOut())}
        title={t('screen.settings.screen.helpCenter.item.deleteAccount.label')}
        text={t('screen.settings.screen.helpCenter.item.deleteAccount.description')}
        buttonText={t('screen.settings.screen.helpCenter.item.deleteAccount.action.confirmButton')}
        isLoading={isPending}
        isDestructive
      />
    </Page>
  );
}
