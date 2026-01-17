import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Pressable, View } from 'react-native';
import { StyledText } from '../ui';
import { UrlSheetRef } from '@/app/recipes/[id]/UrlSheet';
import { ImageSheetRef } from './ImageSheet';
import { useRouter } from 'expo-router';

type Props = {};
export type CreateRecipeOptionsSheet = { open: () => void };
export const CreateRecipeOptionsSheet = forwardRef<CreateRecipeOptionsSheet, Props>(({}, ref) => {
  CreateRecipeOptionsSheet.displayName = 'CreateRecipeOptionsSheet';
  const router = useRouter();
  const urlSheetRef = useRef<UrlSheetRef>(null);
  const imageSheetRef = useRef<ImageSheetRef>(null);

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
          Create Recipe
        </StyledText>

        <StyledText className="text mb-8 text-slate-600 mt-2 ml-2">
          There are different ways to create a recipe. The easiest way is to generate a recipe from either an image or a
          URL.
        </StyledText>

        <Pressable
          onPress={() => onAction(() => imageSheetRef.current?.open())}
          className="p-4 bg-pastel-green rounded-2xl mb-4"
        >
          <StyledText className="text-lg mb-2" weight="bold">
            Generate from image
          </StyledText>
          <StyledText className="text-sm text-slate-500">
            Upload or snap an image of a recipe. We will try our best to convert it to this app.
          </StyledText>
        </Pressable>

        <Pressable
          onPress={() => onAction(() => router.push('recipes/create/create'))}
          className="p-4 bg-pastel-yellow rounded-2xl mb-4"
        >
          <StyledText className="text-lg mb-2" weight="bold">
            Generate from scratch
          </StyledText>
          <StyledText className="text-sm text-slate-500">
            Upload or snap an image of a recipe. We will try our best to convert it to this app.
          </StyledText>
        </Pressable>

        <Pressable
          onPress={() => onAction(() => router.push('recipes/create/link'))}
          className="p-4 bg-pastel-purple rounded-2xl mb-4"
        >
          <StyledText className="text-lg mb-2" weight="bold">
            Generate from video
          </StyledText>
          <StyledText className="text-sm text-slate-500">
            Import from instagram or tik-tok using the video link.
          </StyledText>
        </Pressable>

        <Pressable
          onPress={() => onAction(() => router.push('recipes/create/link'))}
          className="p-4 bg-pastel-blue rounded-2xl mb-4"
        >
          <StyledText className="text-lg mb-2" weight="bold">
            Generate from webpage
          </StyledText>
          <StyledText className="text-sm text-slate-500">Import from a webpage using the URL.</StyledText>
        </Pressable>
      </View>
    </TrueSheet>
  );
});
