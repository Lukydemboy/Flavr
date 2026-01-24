import ImageIcon from '@/components/icons/Image';
import InfoIcon from '@/components/icons/Info';
import { ActionButton, Page, StyledText } from '@/components/ui';
import ImagePicker from '@/components/ui/ImagePicker';
import { Asset } from '@/domain/types/asset';
import { useGenerateRecipeFromImage } from '@/queries/recipe';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function CreateRecipeFromImageScreen() {
  const [image, setImage] = useState<Asset | null>(null);
  const { t } = useTranslation();
  const router = useRouter();

  const { mutateAsync: generateRecipeFromImage, isPending } = useGenerateRecipeFromImage();

  return (
    <Page>
      <View className="flex items-center justify-center mt-6 mb-8">
        <View className="bg-primary-50 p-10 rounded-full">
          <View className="bg-primary-100 p-10 rounded-3xl" style={{ transform: [{ rotate: '10deg' }] }}>
            <View style={{ transform: [{ rotate: '-10deg' }] }}>
              <ImageIcon color="#2d5d55" width={46} height={46} />
            </View>
          </View>
        </View>

        <StyledText className="text-slate-800 text-xl mt-6" weight="black">
          {t('screen.create.image.title')}
        </StyledText>
        <StyledText className="text-slate-400 mt-2 text-center mx-9">{t('screen.create.image.description')}</StyledText>
      </View>

      <ImagePicker onImagePicked={setImage} />
      <View className="mt-2 mx-2 flex flex-row items-center gap-x-2">
        <InfoIcon color="#28524b" width={14} height={14} />
        <StyledText className="text-xs text-slate-400 ml-2">{t('screen.create.image.hint')}</StyledText>
      </View>
      <ActionButton
        viewClassName="mt-auto"
        size="large"
        text={t('screen.create.image.action.generate')}
        isLoading={isPending}
        disabled={!image || isPending}
        onPress={() => generateRecipeFromImage(image!).then(() => router.back())}
      />
    </Page>
  );
}
