import { ActionButton, Page, StyledText } from '@/components/ui';
import { InputField } from '@/components/ui/InputField';
import { ApiErrorResponse } from '@/domain/types/error';
import { useUpdateUser, useUser } from '@/queries/user';
import { useForm } from '@tanstack/react-form';
import { Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

const enum CompleteProfileErrors {
  USERNAME_ALREADY_EXISTS = 'username_already_exists',
}

export default function CompleteProfileScreen() {
  const [isErrorShown, setIsErrorShown] = useState(false);
  const { data: user } = useUser();
  const router = useRouter();

  const { mutateAsync: updateUser } = useUpdateUser();

  const form = useForm({
    defaultValues: { username: '' },
    onSubmit: async ({ value }) => {
      const { username } = value;

      setIsErrorShown(false);

      await updateUser({ username })
        .then(() => router.replace('/notification-consent'))
        .catch(err => {
          const errorResponse = err.response?.data as ApiErrorResponse;

          if (errorResponse.code === CompleteProfileErrors.USERNAME_ALREADY_EXISTS) {
            setIsErrorShown(true);
          }
        });
    },
  });

  if (!user) return <Redirect href="/login" />;

  return (
    <Page safeAreaTop>
      <View className="grow">
        <StyledText className="text-2xl mb-4" weight="black">
          Complete profile
        </StyledText>
        <StyledText className="text-slate-400 leading-relaxed mb-8">
          Your profile is incomplete. We just need a fun username to get you started, keep in mind this is what other
          users will see.
        </StyledText>
        <StyledText className="mb-2 ml-4" weight="bold">
          Username
        </StyledText>
        <form.Field name="username">
          {field => (
            <InputField
              placeholder="Your fun username"
              className={isErrorShown ? 'border-pink-60 border-2' : ''}
              value={field.state.value}
              onChangeText={text => form.setFieldValue('username', text)}
              error={isErrorShown ? 'Username is already in use' : undefined}
            />
          )}
        </form.Field>
      </View>
      <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <ActionButton
            disabled={!canSubmit}
            isLoading={isSubmitting}
            text="Save"
            size="large"
            onPress={() => form.handleSubmit()}
          />
        )}
      </form.Subscribe>
    </Page>
  );
}
