import { TrueSheet } from "@lodev09/react-native-true-sheet";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { View } from "react-native";
import { ActionButton, StyledText } from "../ui";
import { useGenerateRecipeFromImage } from "@/queries/recipe";
import { useRouter } from "expo-router";
import ImagePicker from "../ui/ImagePicker";
import { ImagePickerAsset } from "expo-image-picker";
import { SaveFormat, ImageManipulator } from "expo-image-manipulator";

type Props = {};
export type ImageSheetRef = { open: () => void };

export const ImageSheet = forwardRef<ImageSheetRef, Props>((_, ref) => {
  ImageSheet.displayName = "ImageSheet";

  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const router = useRouter();

  // prettier-ignore
  const { mutateAsync: generateRecipeFromImage, isPending } = useGenerateRecipeFromImage();

  const onSubmit = async () => {
    if (!image) return;

    await generateRecipeFromImage(image).then(() => {
      setImage(null);
      sheet.current?.dismiss();
      router.back();
    });
  };

  const sheet = useRef<TrueSheet>(null);

  useImperativeHandle(ref, () => ({
    open: () => sheet.current?.present(),
  }));

  const onWillDismiss = () => {
    setImage(null);
  };

  return (
    <TrueSheet
      onWillDismiss={onWillDismiss}
      ref={sheet}
      detents={["auto"]}
      cornerRadius={24}
    >
      <View className="p-4">
        <StyledText className="mb-2 pt-2" weight="bold">
          Pick an image
        </StyledText>
        <StyledText className="mb-4 pt-2" weight="regular">
          Pick or take an image that includes the whole recipe.
        </StyledText>

        <ImagePicker onImagePicked={setImage} />

        <ActionButton
          viewClassName="mt-6"
          size="large"
          text="Generate recipe"
          isLoading={isPending}
          disabled={!image || isPending}
          onPress={onSubmit}
        />
      </View>
    </TrueSheet>
  );
});
