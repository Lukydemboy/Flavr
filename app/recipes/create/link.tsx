import HyperLinkIcon from '@/components/icons/HyperLink';
import InfoIcon from '@/components/icons/Info';
import { ActionButton, Page, StyledText } from '@/components/ui';
import { InputField } from '@/components/ui/InputField';
import { useGenerateRecipeFromInstagram, useGenerateRecipeFromWebpage } from '@/queries/recipe';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function CreateRecipeScreen() {
  const router = useRouter();

  const { mutateAsync: generateRecipeFromInstagram } = useGenerateRecipeFromInstagram();
  const { mutateAsync: generateRecipeFromUrl } = useGenerateRecipeFromWebpage();

  const form = useForm({
    defaultValues: { url: '' },
    onSubmit: async ({ value: { url } }) => {
      if (url.includes('instagram')) {
        await generateRecipeFromInstagram(url).then(() => {
          form.reset();
          router.back();
        });
      }

      await generateRecipeFromUrl(url).then(() => {
        form.reset();
        router.back();
      });
    },
  });

  return (
    <Page>
      <View className="flex items-center justify-center mt-6 mb-12">
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

      <StyledText className="ml-4 mb-2 pt-2" weight="bold">
        Recipe URL
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
      <View className="mt-2 mx-2 flex flex-row items-center gap-x-2">
        <InfoIcon color="#28524b" width={14} height={14} />
        <StyledText className="text-xs text-slate-400 ml-2">
          We try to extract the recipe details from the URL you provide. If the recipe is not found or the details are
          incomplete, you can manually edit the recipe details.
        </StyledText>
      </View>

      <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <ActionButton
            viewClassName="mt-auto"
            size="large"
            text="Generate recipe"
            isLoading={isSubmitting}
            disabled={!canSubmit}
            onPress={form.handleSubmit}
          />
        )}
      </form.Subscribe>
    </Page>
  );
}
