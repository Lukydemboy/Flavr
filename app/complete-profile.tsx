import { ActionButton, Page, StyledText } from "@/components/ui";
import { InputField } from "@/components/ui/InputField";
import { useUpdateUser, useUser } from "@/queries/user";
import { useForm } from "@tanstack/react-form";
import { Redirect, useRouter } from "expo-router";
import { View } from "react-native";

export default function CompleteProfileScreen() {
  const { data: user } = useUser();
  const router = useRouter();

  const { mutateAsync: updateUser } = useUpdateUser();

  const form = useForm({
    defaultValues: { username: "" },
    onSubmit: async ({ value }) => {
      const { username } = value;
      await updateUser({ username }).then(() => {
        router.replace("/(tabs)");
      });
    },
  });

  if (!user) return <Redirect href="/login" />;

  return (
    <Page safeAreaTop>
      <View className="grow">
        <StyledText className="text-2xl mb-4" weight="bold">
          Complete profile
        </StyledText>
        <StyledText className="text-slate-400 leading-normal mb-8">
          Your profile is incomplete. We just need a fun username to get you
          started, keep in mind this is what other users will see.
        </StyledText>
        <StyledText className="mb-2 ml-2" weight="semibold">
          Username
        </StyledText>
        <form.Field name="username">
          {(field) => (
            <InputField
              placeholder="Your fun username"
              value={field.state.value}
              onChangeText={(text) => form.setFieldValue("username", text)}
              error={
                field.state.meta.errors
                  ? field.state.meta.errors.join(", ")
                  : undefined
              }
            />
          )}
        </form.Field>
      </View>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
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
