import ChevronLeftIcon from "@/components/icons/ChevronLeft";
import { ActionButton, Page, StyledText } from "@/components/ui";
import { useRouter } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MailSent() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return (
    <Page container={false}>
      <View
        className={`relative bg-pastel-green h-[65%] rounded-bl-[4rem] rounded-br-[4rem]`}
      >
        <Pressable
          onPress={() => router.back()}
          className="left-4"
          style={{ top: top }}
        >
          <View className="w-11 h-11 bg-white rounded-xl mb-12 flex items-center justify-center">
            <ChevronLeftIcon width={15} color="#000000" />
          </View>
        </Pressable>

        <View className="mt-auto flex items-center justify-center mb-12">
          <Image
            source={require("@/assets/images/mailman.webp")}
            className="h-96 w-96"
          />
        </View>
      </View>

      <View className="px-8 grow">
        <StyledText className="text-4xl font-bold mb-4 mt-8" weight="bold">
          Email sent
        </StyledText>
        <StyledText className="text-lg mb-8 text-slate-500">
          We have sent you an email with a login link. Please check your inbox.
        </StyledText>

        <View className="mt-auto">
          <ActionButton disabled={true} onPress={() => {}} text="Resend" />
          <StyledText className="text-center text-xs text-gray-600 mt-2">
            You can resend another email in 20 seconds
          </StyledText>
        </View>
      </View>
    </Page>
  );
}
