import HyperLinkIcon from '@/components/icons/HyperLink';
import InfoIcon from '@/components/icons/Info';
import { ActionButton, Page, StyledText } from '@/components/ui';
import ImagePicker from '@/components/ui/ImagePicker';
import { useGenerateRecipeFromImage } from '@/queries/recipe';
import { ImagePickerAsset } from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function CreateRecipeFromImageScreen() {
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const router = useRouter();

  const { mutateAsync: generateRecipeFromImage, isPending } = useGenerateRecipeFromImage();

  return (
    <Page>
      <View className="flex items-center justify-center mt-6 mb-8">
        <View className="bg-primary-50 p-10 rounded-full">
          <View className="bg-primary-100 p-10 rounded-3xl" style={{ transform: [{ rotate: '10deg' }] }}>
            <HyperLinkIcon color="#2d5d55" width={46} height={46} />
          </View>
        </View>

        <StyledText className="text-slate-800 text-xl mt-6" weight="bold">
          Import from URL
        </StyledText>
        <StyledText className="text-slate-400 mt-2 text-center mx-9">
          Paste a link from the recipe you want to import and we'll extract the recipe details for you!
        </StyledText>
      </View>

      <ImagePicker onImagePicked={setImage} />
      <View className="mt-2 mx-2 flex flex-row items-center gap-x-2">
        <InfoIcon color="#28524b" width={14} height={14} />
        <StyledText className="text-xs text-slate-400 ml-2">
          We try to extract the recipe details from the URL you provide. If the recipe is not found or the details are
          incomplete, you can manually edit the recipe details.
        </StyledText>
      </View>
      <ActionButton
        viewClassName="mt-auto"
        size="large"
        text="Generate recipe"
        isLoading={isPending}
        disabled={!image || isPending}
        onPress={() => generateRecipeFromImage(image!).then(() => router.back())}
      />
    </Page>
  );
}
