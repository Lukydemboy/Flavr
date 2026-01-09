import { ActionButton, Page, StyledText } from '@/components/ui';
import { InputField } from '@/components/ui/InputField';
import { Visibility } from '@/domain/enums/visibility';
import { useCreateGroup } from '@/queries/group';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { z } from 'zod';

const createGroupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  description: z.string().max(1000),
  visibility: z.enum(Visibility),
});

export default function CreateGroupScreen() {
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
    <Page className="pt-4">
      <ScrollView>
        <StyledText className="font-bold ml-2 mb-2" weight="bold">
          Name
        </StyledText>
        <form.Field name="name">
          {field => (
            <InputField
              value={field.state.value}
              onChangeText={text => form.setFieldValue('name', text)}
              placeholder="Group name"
              error={field.state.meta.errors?.map(error => (error ? error.message : '')).join(', ')}
            />
          )}
        </form.Field>

        <StyledText className="font-bold ml-2 mb-2 mt-4" weight="bold">
          Description
        </StyledText>
        <form.Field name="description">
          {field => (
            <InputField
              className="mb-4"
              value={field.state.value}
              onChangeText={text => form.setFieldValue('description', text)}
              placeholder="Group description"
              error={field.state.meta.errors?.join(', ')}
              multiline
            />
          )}
        </form.Field>

        <StyledText className="font-bold ml-2 mb-2" weight="bold">
          Visibility
        </StyledText>
        <View className="flex flex-row gap-x-4">
          <Pressable
            onPress={() => {
              form.setFieldValue('visibility', Visibility.Public);
              setVisibility(Visibility.Public);
            }}
            className={`rounded-lg border-2 p-4 bg-white w-[48%] transition ${visibility === Visibility.Public ? 'border-primary bg-green-50' : 'border-gray-300'}`}
          >
            <StyledText className="mb-2" weight="semiBold">
              Public
            </StyledText>
            <StyledText className="text-sm text-gray-500">
              People can find your group in search results and join it.
            </StyledText>
          </Pressable>
          <Pressable
            onPress={() => {
              form.setFieldValue('visibility', Visibility.Private);
              setVisibility(Visibility.Private);
            }}
            className={`rounded-lg border-2 p-4 bg-white w-[48%] transition ${visibility === Visibility.Private ? 'border-primary bg-green-50' : 'border-gray-300'}`}
          >
            <StyledText className="mb-2" weight="semiBold">
              Private
            </StyledText>
            <StyledText className="text-sm text-gray-500">
              People can not find your group in search results and can only join by invitation.
            </StyledText>
          </Pressable>
        </View>
      </ScrollView>

      <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <ActionButton
            viewClassName="mt-auto"
            size="large"
            text="Create group"
            isLoading={isSubmitting}
            disabled={!canSubmit}
            onPress={() => form.handleSubmit()}
          />
        )}
      </form.Subscribe>
    </Page>
  );
}
