import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import { ActionButton, Page, StyledText } from "@/components/ui";
import { InputField } from "@/components/ui/InputField";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { useForm } from "@tanstack/react-form";
import { useRequestMagicLink } from "@/queries/auth";

export default function LoginScreen() {
  const router = useRouter();

  const { mutateAsync: requestMagicLink } = useRequestMagicLink();

  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      await requestMagicLink(value.email).then(() => {
        router.push("/mail-sent");
      });
    },
  });

  return (
    <Page safeAreaTop>
      <View>
        <Pressable onPress={() => router.back()}>
          <View className="w-11 h-11 bg-white rounded-xl mb-12 flex items-center justify-center">
            <ChevronLeftIcon width={15} color="#000000" />
          </View>
        </Pressable>

        <StyledText className="font-bold text-xl mb-2" weight="bold">
          Log in
        </StyledText>
        <View className="flex flex-row mb-6">
          <StyledText className="text-slate-500">
            By logging in, you agree to our{" "}
          </StyledText>
          <StyledText className="font-bold" weight="bold">
            Terms of Service
          </StyledText>
        </View>

        <form.Field name="email">
          {(field) => (
            <InputField
              value={field.state.value}
              onChangeText={(text) => form.setFieldValue("email", text)}
              placeholder="Email address"
              autoComplete="email"
              error={field.state.meta.errors?.join(", ")}
            />
          )}
        </form.Field>
        <StyledText className="ml-2 text-sm text-slate-400 mt-1 mb-8">
          We will send you an email with a login link
        </StyledText>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <ActionButton
              size="large"
              text="Log in"
              isLoading={isSubmitting}
              disabled={!canSubmit}
              onPress={() => form.handleSubmit()}
            />
          )}
        </form.Subscribe>
      </View>
    </Page>
  );
}
