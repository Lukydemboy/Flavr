import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import { ActionButton, StyledText } from '../ui';
import { InputField } from '../ui/InputField';
import { useForm } from '@tanstack/react-form';
import { useGenerateRecipeFromInstagram, useGenerateRecipeFromWebpage } from '@/queries/recipe';
import { useRouter } from 'expo-router';

type Props = {};
export type UrlSheetRef = { open: () => void };

export const UrlSheet = forwardRef<UrlSheetRef, Props>((_, ref) => {
  UrlSheet.displayName = 'UrlSheet';
  const router = useRouter();

  // prettier-ignore
  const { mutateAsync: generateRecipeFromInstagram } = useGenerateRecipeFromInstagram();
  const { mutateAsync: generateRecipeFromUrl } = useGenerateRecipeFromWebpage();

  const form = useForm({
    defaultValues: { url: '' },
    onSubmit: async ({ value: { url } }) => {
      if (url.includes('instagram')) {
        await generateRecipeFromInstagram(url).then(() => {
          form.reset();
          sheet.current?.dismiss();
          router.back();
        });
      }

      await generateRecipeFromUrl(url).then(() => {
        form.reset();
        sheet.current?.dismiss();
        router.back();
      });
    },
  });

  const sheet = useRef<TrueSheet>(null);

  useImperativeHandle(ref, () => ({
    open: () => sheet.current?.present(),
  }));

  const onWillDismiss = () => {};

  return (
    <TrueSheet onWillDismiss={onWillDismiss} ref={sheet} detents={['auto']} cornerRadius={24}>
      <View className="p-4">
        <StyledText className="ml-2 mb-4 pt-2" weight="bold">
          Enter URL
        </StyledText>
        <form.Field name="url">
          {field => (
            <InputField
              value={field.state.value}
              onChangeText={text => form.setFieldValue('url', text)}
              placeholder="Recipe link"
              autoComplete="url"
              error={field.state.meta.errors?.join(', ')}
            />
          )}
        </form.Field>

        <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <ActionButton
              viewClassName="mt-6"
              size="large"
              text="Generate recipe"
              isLoading={isSubmitting}
              disabled={!canSubmit}
              onPress={form.handleSubmit}
            />
          )}
        </form.Subscribe>
      </View>
    </TrueSheet>
  );
});
