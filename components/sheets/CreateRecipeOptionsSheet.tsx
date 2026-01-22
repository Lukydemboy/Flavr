import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Pressable, View } from 'react-native';
import { StyledText } from '../ui';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

type Props = {};
export type CreateRecipeOptionsSheet = { open: () => void };
export const CreateRecipeOptionsSheet = forwardRef<CreateRecipeOptionsSheet, Props>(({}, ref) => {
  CreateRecipeOptionsSheet.displayName = 'CreateRecipeOptionsSheet';
  const { t } = useTranslation();
  const router = useRouter();

  const sheet = useRef<TrueSheet>(null);

  useImperativeHandle(ref, () => ({
    open: () => sheet.current?.present(),
  }));

  const onAction = (action: () => void) => {
    action();
    sheet.current?.dismiss();
  };

  return (
    <TrueSheet ref={sheet} detents={['auto']} cornerRadius={24}>
      <View className="p-4">
        <StyledText className="text-xl pt-2 ml-2" weight="black">
          {t('component.createSheet.title')}
        </StyledText>

        <StyledText className="text mb-8 text-slate-600 mt-2 ml-2">{t('component.createSheet.description')}</StyledText>

        <Pressable
          onPress={() => onAction(() => router.push('recipes/create/image'))}
          className="p-4 bg-pastel-green rounded-2xl mb-4"
        >
          <StyledText className="text-lg mb-2" weight="bold">
            {t('component.createSheet.option.image.title')}
          </StyledText>
          <StyledText className="text-sm text-slate-500">
            {t('component.createSheet.option.image.description')}
          </StyledText>
        </Pressable>

        <Pressable
          onPress={() => onAction(() => router.push('recipes/create/create'))}
          className="p-4 bg-pastel-yellow rounded-2xl mb-4"
        >
          <StyledText className="text-lg mb-2" weight="bold">
            {t('component.createSheet.option.manual.title')}
          </StyledText>
          <StyledText className="text-sm text-slate-500">
            {t('component.createSheet.option.manual.description')}
          </StyledText>
        </Pressable>

        <Pressable
          onPress={() => onAction(() => router.push('recipes/create/link'))}
          className="p-4 bg-pastel-purple rounded-2xl mb-4"
        >
          <StyledText className="text-lg mb-2" weight="bold">
            {t('component.createSheet.option.social.title')}
          </StyledText>
          <StyledText className="text-sm text-slate-500">
            {t('component.createSheet.option.social.description')}
          </StyledText>
        </Pressable>

        <Pressable
          onPress={() => onAction(() => router.push('recipes/create/link'))}
          className="p-4 bg-pastel-blue rounded-2xl mb-4"
        >
          <StyledText className="text-lg mb-2" weight="bold">
            {t('component.createSheet.option.webpage.title')}
          </StyledText>
          <StyledText className="text-sm text-slate-500">
            {t('component.createSheet.option.webpage.description')}
          </StyledText>
        </Pressable>
      </View>
    </TrueSheet>
  );
});
