import { Pressable, View, Platform, StatusBar } from "react-native";
import { Href, useRouter } from "expo-router";
import { StyledTitle } from "../ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ReactNode } from "react";
import ChevronLeftIcon from "../icons/ChevronLeft";

type Props = {
  title: string;
  headerRight?: () => ReactNode;
  fallbackBackscreen?: Href;
};

export default function AppHeader({
  title,
  headerRight,
  fallbackBackscreen,
}: Props) {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const handleBackPress = () => {
    if (!router.canGoBack() && fallbackBackscreen) {
      router.replace(fallbackBackscreen);
    } else {
      router.back();
    }
  };

  return (
    <View
      style={{
        paddingTop:
          Platform.OS === "android" && StatusBar.currentHeight
            ? StatusBar.currentHeight + 10
            : 0 + top,
      }}
      className="mb-6 relative"
    >
      <View className="relative flex flex-row justify-between mx-4">
        {(fallbackBackscreen || router.canDismiss()) && (
          <Pressable onPress={handleBackPress}>
            <View className="w-0">
              <ChevronLeftIcon width={26} height={26} color="#0f172a" />
            </View>
          </Pressable>
        )}
        <StyledTitle className="text-center">{title}</StyledTitle>
        {headerRight ? (
          <View className="flex flex-row justify-end">{headerRight()}</View>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
}
