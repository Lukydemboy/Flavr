import { ActionButton, Page, StyledText } from "@/components/ui";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";

export default function StartPage() {
  const router = useRouter();

  return (
    <Page container={false}>
      <View
        className={`bg-pastel-green h-[65%] rounded-bl-[4rem] rounded-br-[4rem]`}
      >
        <View className="h-[60%] mt-auto mb-24">
          <Image
            className="w-full h-full"
            source={require("@/assets/images/start.webp")}
          />
        </View>
      </View>
      <View className="px-8 pt-8 grow">
        <StyledText className="text-4xl leading-relaxed" weight="bold">
          Start sharing your cooking journey
        </StyledText>
        <StyledText className="text-2xl leading-relaxed mt-4" weight="thin">
          more than a recipe manager
        </StyledText>
        <ActionButton
          textClassName="font-bold"
          size="large"
          viewClassName="mt-auto"
          onPress={() => router.push("/login")}
          text="Get started!"
        />
      </View>
    </Page>
  );
}
