import { Page, StyledText } from "@/components/ui";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export default function RecipesScreen() {
  const router = useRouter();

  return (
    <Page safeAreaTop className="gap-y-4">
      <View className="flex flex-row justify-between items-center">
        <StyledText className="text-2xl" weight="bold">
          Recipes
        </StyledText>

        <Pressable
          onPress={() => router.push("/recipes/create")}
          className="bg-gray-200 p-2 rounded-lg flex flex-row items-center gap-x-2 px-3"
        >
          <StyledText className="text-sm">Add</StyledText>
        </Pressable>
      </View>
    </Page>
  );
}
