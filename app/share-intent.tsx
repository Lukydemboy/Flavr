import { Image, View } from 'react-native';

import { useRouter } from 'expo-router';
import { ShareIntent, useShareIntentContext } from 'expo-share-intent';
import { useCallback, useEffect, useState } from 'react';
import {
  useGenerateRecipeFromImage,
  useGenerateRecipeFromInstagram,
  useGenerateRecipeFromWebpage,
} from '@/queries/recipe';
import { Page, StyledText } from '@/components/ui';
import { CircleLoader } from '@/components/loaders';
import LottieView from 'lottie-react-native';

const SUCCESS_ANIMATION_DURATION = 500;

export default function ShareIntentScreen() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntentContext();

  const { mutateAsync: generateFromInstagram, isPending: isPendingInstagram } = useGenerateRecipeFromInstagram();
  const { mutateAsync: generateFromImage, isPending: isPendingImage } = useGenerateRecipeFromImage();
  const { mutateAsync: generateFromUrl, isPending: isPendingUrl } = useGenerateRecipeFromWebpage();

  const onSuccess = useCallback(() => {
    setIsSuccess(true);
    setTimeout(() => {
      resetShareIntent();
      router.replace('/(tabs)');
    }, SUCCESS_ANIMATION_DURATION);
  }, [resetShareIntent, router]);

  const handleShareIntent = useCallback((intent: ShareIntent) => {
    if (intent.type === 'weburl' && intent.webUrl) {
      if (intent.webUrl?.includes('instagram')) {
        return generateFromInstagram(intent.webUrl).then(() => onSuccess());
      }

      return generateFromUrl(intent.webUrl).then(() => onSuccess());
    }

    if (intent.files?.length) {
      const file = intent.files[0];

      return generateFromImage(file).then(() => onSuccess());
    }
  }, []);

  useEffect(() => {
    if (hasShareIntent) {
      handleShareIntent(shareIntent);
    }
  }, [hasShareIntent, handleShareIntent]);

  if (isSuccess) {
    return (
      <View className="flex items-center justify-center grow">
        <LottieView
          source={require('@/assets/animation/success.json')}
          style={{ width: 300, height: 300 }}
          autoPlay
          loop={false}
        />
      </View>
    );
  }

  return (
    <Page container={false}>
      <View className={`bg-pastel-green h-[65%] rounded-bl-[4rem] rounded-br-[4rem]`}>
        <View className="h-[60%] mt-auto mb-24">
          <Image className="w-96 h-96 mx-auto" source={require('@/assets/images/paperwork.webp')} />
        </View>
      </View>

      <View className="px-4 grow">
        <StyledText className="font-nunito-black text-2xl text-center mt-4" weight="bold">
          Guac is currently writing your recipe!
        </StyledText>

        <View className="flex justify-center items-center mt-4">
          {(isPendingInstagram || isPendingImage || isPendingUrl) && <CircleLoader />}
        </View>

        <StyledText className="font-nunito-regular text-sm text-slate-400 text-center mt-auto" weight="regular">
          This can take a minute or two.
        </StyledText>
      </View>

      {shareIntent?.files?.map(file => (
        <Image key={file.path} source={{ uri: file.path }} />
      ))}
    </Page>
  );
}
