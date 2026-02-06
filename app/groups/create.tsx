import { ActionButton, Page, StyledText } from '@/components/ui';
import { InputField } from '@/components/ui/InputField';
import { Visibility } from '@/domain/enums/visibility';
import { useCreateGroup } from '@/queries/group';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View } from 'react-native';
import { z } from 'zod';

const createGroupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  description: z.string().max(1000),
  visibility: z.enum(Visibility),
});

export default function CreateGroupScreen() {
  const { t } = useTranslation();
  const [visibility, setVisibility] = useState(Visibility.Public);
  const router = useRouter();

  const { mutateAsync: createGroup } = useCreateGroup();

  const form = useForm({
    defaultValues: { name: '', description: '', visibility: Visibility.Public },
    validators: { onSubmit: createGroupSchema },
    onSubmit: async ({ value }) => {
      await createGroup(value).then(() => router.back());
    },
  });

  return (
    <Page>
      <ScrollView>
        <StyledText className="text-gray-500 text-sm mb-4">{t('screen.createGroups.description')}</StyledText>

        <StyledText className="font-bold ml-2 mb-2" weight="bold">
          {t('screen.createGroups.form.name.label')}
        </StyledText>
        <form.Field name="name">
          {field => (
            <InputField
              value={field.state.value}
              onChangeText={text => form.setFieldValue('name', text)}
              placeholder={t('screen.createGroups.form.name.placeholder')}
              error={field.state.meta.errors?.map(error => (error ? error.message : '')).join(', ')}
            />
          )}
        </form.Field>

        <StyledText className="font-bold ml-2 mb-2 mt-4" weight="bold">
          {t('screen.createGroups.form.description.label')}
        </StyledText>
        <form.Field name="description">
          {field => (
            <InputField
              className="mb-4"
              value={field.state.value}
              onChangeText={text => form.setFieldValue('description', text)}
              placeholder={t('screen.createGroups.form.description.placeholder')}
              error={field.state.meta.errors?.join(', ')}
              multiline
            />
          )}
        </form.Field>

        <StyledText className="font-bold ml-2 mb-2 mt-4" weight="bold">
          {t('screen.createGroups.form.visibility.label')}
        </StyledText>
        <View className="flex flex-row gap-x-4">
          <Pressable
            onPress={() => {
              form.setFieldValue('visibility', Visibility.Public);
              setVisibility(Visibility.Public);
            }}
            className={`rounded-2xl border-2 p-4 w-[48%] transition ${visibility === Visibility.Public ? 'border-primary-500 bg-primary-50' : 'border-slate-300 bg-white'}`}
          >
            <StyledText className="mb-2" weight="semiBold">
              {t('screen.createGroups.form.visibility.options.public.label')}
            </StyledText>
            <StyledText className="text-sm text-gray-500">
              {t('screen.createGroups.form.visibility.options.public.description')}
            </StyledText>
          </Pressable>
          <Pressable
            onPress={() => {
              form.setFieldValue('visibility', Visibility.Private);
              setVisibility(Visibility.Private);
            }}
            className={`rounded-2xl border-2 p-4 w-[48%] transition ${visibility === Visibility.Private ? 'border-primary-500 bg-primary-50' : 'border-slate-300 bg-white'}`}
          >
            <StyledText className="mb-2" weight="semiBold">
              {t('screen.createGroups.form.visibility.options.private.label')}
            </StyledText>
            <StyledText className="text-sm text-gray-500">
              {t('screen.createGroups.form.visibility.options.private.description')}
            </StyledText>
          </Pressable>
        </View>
      </ScrollView>

      <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <ActionButton
            viewClassName="mt-auto"
            size="large"
            text={t('screen.createGroups.form.action.create')}
            isLoading={isSubmitting}
            disabled={!canSubmit}
            onPress={() => form.handleSubmit()}
          />
        )}
      </form.Subscribe>
    </Page>
  );
}
