import { ImageSheet, ImageSheetRef } from '@/components/sheets/ImageSheet';
import { UrlSheet, UrlSheetRef } from '@/components/sheets/UrlSheet';
import { Page, StyledText } from '@/components/ui';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Pressable } from 'react-native';

export default function CreateRecipeScreen() {
  const router = useRouter();
  const urlSheetRef = useRef<UrlSheetRef>(null);
  const imageSheetRef = useRef<ImageSheetRef>(null);

  return (
    <>
      <Page>
        <StyledText className="text-xl font-bold mb-8 pt-6">Create Recipe</StyledText>

        <Pressable onPress={() => imageSheetRef.current?.open()} className="p-4 bg-pastel-green rounded-2xl mb-4">
          <StyledText className="text-lg mb-2" weight="bold">
            Generate from image
          </StyledText>
          <StyledText className="text-sm text-slate-500">
            Upload or snap an image of a recipe. We will try our best to convert it to this app.
          </StyledText>
        </Pressable>

        <Pressable
          onPress={() => router.push('recipes/create/create')}
          className="p-4 bg-pastel-yellow rounded-2xl mb-4"
        >
          <StyledText className="text-lg mb-2" weight="bold">
            Generate from scratch
          </StyledText>
          <StyledText className="text-sm text-slate-500">
            Upload or snap an image of a recipe. We will try our best to convert it to this app.
          </StyledText>
        </Pressable>

        <Pressable onPress={() => urlSheetRef.current?.open()} className="p-4 bg-pastel-purple rounded-2xl mb-4">
          <StyledText className="text-lg mb-2" weight="bold">
            Generate from video
          </StyledText>
          <StyledText className="text-sm text-slate-500">
            Import from instagram or tik-tok using the video link.
          </StyledText>
        </Pressable>

        <Pressable onPress={() => urlSheetRef.current?.open()} className="p-4 bg-pastel-blue rounded-2xl mb-4">
          <StyledText className="text-lg mb-2" weight="bold">
            Generate from webpage
          </StyledText>
          <StyledText className="text-sm text-slate-500">Import from a webpage using the URL.</StyledText>
        </Pressable>
      </Page>

      <UrlSheet ref={urlSheetRef} />
      <ImageSheet ref={imageSheetRef} />
    </>
  );
}
