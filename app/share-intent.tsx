import { Image, View } from "react-native";

import { useRouter } from "expo-router";
import { useShareIntentContext } from "expo-share-intent";
import { useEffect, useState } from "react";
import { useGenerateRecipeFromInstagram } from "@/queries/recipe";
import { Page, StyledText } from "@/components/ui";
import { CircleLoader } from "@/components/loaders";
import LottieView from "lottie-react-native";

const SUCCESS_ANIMATION_DURATION = 500;

export default function ShareIntent() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const { hasShareIntent, shareIntent, resetShareIntent } =
    useShareIntentContext();

  const { mutateAsync: generateFromInstagram, isPending } =
    useGenerateRecipeFromInstagram();

  useEffect(() => {
    if (hasShareIntent) {
      if (shareIntent.type === "weburl") {
        if (shareIntent.webUrl?.includes("instagram")) {
          generateFromInstagram(shareIntent.webUrl).then(() => {
            setIsSuccess(true);
            setTimeout(() => {
              resetShareIntent();
              router.replace("/recipes");
            }, SUCCESS_ANIMATION_DURATION);
          });
        }
      }
    }
  }, [
    hasShareIntent,
    generateFromInstagram,
    shareIntent.type,
    shareIntent.webUrl,
    router,
    resetShareIntent,
  ]);

  if (isSuccess) {
    return (
      <View className="flex items-center justify-center grow">
        <LottieView
          source={require("@/assets/animation/success.json")}
          style={{ width: 300, height: 300 }}
          autoPlay
          loop={false}
        />
      </View>
    );
  }

  return (
    <Page container={false}>
      <View
        className={`bg-pastel-green h-[65%] rounded-bl-[4rem] rounded-br-[4rem]`}
      >
        <View className="h-[60%] mt-auto mb-24">
          <Image
            className="w-96 h-96 mx-auto"
            source={require("@/assets/images/paperwork.webp")}
          />
        </View>
      </View>

      <View className="px-4 grow">
        <StyledText
          className="font-nunito-black text-2xl text-center mt-4"
          weight="bold"
        >
          Guac is currently writing your recipe!
        </StyledText>

        <View className="flex justify-center items-center mt-4">
          {isPending && <CircleLoader />}
        </View>

        <StyledText
          className="font-nunito-regular text-sm text-slate-400 text-center mt-auto"
          weight="regular"
        >
          This can take a minute or two.
        </StyledText>
      </View>

      {shareIntent?.files?.map((file) => (
        <Image key={file.path} source={{ uri: file.path }} />
      ))}
    </Page>
  );
}
