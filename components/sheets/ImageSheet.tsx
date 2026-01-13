import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View } from 'react-native';
import { ActionButton, StyledText } from '../ui';
import { useGenerateRecipeFromImage } from '@/queries/recipe';
import { useRouter } from 'expo-router';
import ImagePicker from '../ui/ImagePicker';
import { ImagePickerAsset } from 'expo-image-picker';

type Props = {
  onSubmit: (image: ImagePickerAsset) => void;
};
export type ImageSheetRef = { open: () => void };

export const ImageSheet = forwardRef<ImageSheetRef, Props>(({ onSubmit }, ref) => {
  ImageSheet.displayName = 'ImageSheet';

  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!image) return;

    onSubmit(image);
    sheet.current?.dismiss();
  };

  const sheet = useRef<TrueSheet>(null);

  useImperativeHandle(ref, () => ({
    open: () => sheet.current?.present(),
  }));

  const onWillDismiss = () => {
    setImage(null);
  };

  return (
    <TrueSheet onWillDismiss={onWillDismiss} ref={sheet} detents={['auto']} cornerRadius={24}>
      <View className="p-4">
        <StyledText className="mb-2 pt-2" weight="bold">
          Pick an image
        </StyledText>
        <StyledText className="mb-4 pt-2" weight="regular">
          Pick or take an image that includes the whole recipe.
        </StyledText>

        <ImagePicker onImagePicked={setImage} />

        <ActionButton viewClassName="mt-6" size="large" text="Generate recipe" onPress={handleSubmit} />
      </View>
    </TrueSheet>
  );
});
