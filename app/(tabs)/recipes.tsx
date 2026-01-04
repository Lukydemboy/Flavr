import { CrossIcon } from "@/components/icons/Cross";
import { Page, StyledText } from "@/components/ui";
import { InputField } from "@/components/ui/InputField";
import { useRecipes } from "@/queries/recipe";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

export default function RecipesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const { data: recipes } = useRecipes({
    q: searchQuery,
    page: { number: 1, size: 10 },
    sort: { property: "createdAt", direction: "asc" },
    filters: {},
  });

  return (
    <Page safeAreaTop className="gap-y-4">
      <View className="flex flex-row justify-between items-center mb-4">
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

      <View className="relative">
        <InputField
          placeholder="Search recipes..."
          className="border border-gray-300 py-4 mb-4"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />

        {searchQuery && (
          <View className="absolute top-0 right-0">
            <Pressable
              onPress={() => setSearchQuery("")}
              className="bg-gray-200 p-2 rounded-lg top-1/2 right-2"
            >
              <StyledText className="text-sm">
                <CrossIcon width={8} height={8} />
              </StyledText>
            </Pressable>
          </View>
        )}
      </View>

      <ScrollView>
        {!recipes?.content.length && (
          <View className="bg-gray-100 p-4 rounded-lg mb-2">
            <StyledText className="text-lg font-bold">
              No recipes found
            </StyledText>
          </View>
        )}

        {recipes?.content.map((recipe) => (
          <Pressable
            key={recipe.id}
            className="bg-white p-4 rounded-2xl mb-2"
            onPress={() =>
              router.push({
                pathname: `/recipes/[id]`,
                params: { id: recipe.id, title: recipe.name },
              })
            }
          >
            <StyledText className="text-lg font-bold">{recipe.name}</StyledText>
          </Pressable>
        ))}
      </ScrollView>
    </Page>
  );
}
