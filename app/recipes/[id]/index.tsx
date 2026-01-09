import PencilIcon from '@/components/icons/Pencil';
import ShareIcon from '@/components/icons/Share';
import TrashCan from '@/components/icons/TrashCan';
import { CircleLoader } from '@/components/loaders';
import { GeneratedFrom } from '@/components/recipes/GeneratedFrom';
import { RecipeDirectionComponent } from '@/components/recipes/RecipeDirection';
import { ActionButton, ModalComponent, Page, StyledText } from '@/components/ui';
import { Avatar } from '@/components/ui/Avatar';
import { User } from '@/context/authContext';
import { RecipeDirectionWithCompleted, RecipeSectionWithDirections } from '@/domain/types/recipe';
import { useDeleteRecipe, useRecipe } from '@/queries/recipe';
import { useUser } from '@/queries/user';
import { Redirect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

export default function RecipeDetailScreen() {
  const [sections, setSections] = useState<RecipeSectionWithDirections[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const { data: user } = useUser();
  const { data: recipe, isLoading } = useRecipe(id);

  // prettier-ignore
  const { mutateAsync: deleteRecipe, isPending: isDeleting } = useDeleteRecipe(id);

  useEffect(() => navigation.setOptions({ title }), [navigation, title]);
  useEffect(() => {
    if (!recipe) return;
    setSections(
      recipe.sections.map(section => ({
        ...section,
        directions: section.directions.map(direction => ({
          ...direction,
          completed: false,
        })),
      })),
    );
  }, [recipe]);

  if (isLoading) {
    return (
      <Page>
        <View className="flex items-center justify-center">
          <CircleLoader />
        </View>
      </Page>
    );
  }

  if (!user) {
    return <Redirect href={'/login'} />;
  }

  if (!recipe && !isLoading) {
    return <Redirect href={'/recipes'} />;
  }

  return (
    <Page>
      {recipe && (
        <View className="mb-10">
          <StyledText className="text-xl mt-4" weight="bold">
            {recipe?.name}
          </StyledText>

          <View className="mt-2 flex flex-row justify-between">
            {!recipe.owner ? (
              <View>
                <Avatar user={{ username: 'System' } as User}></Avatar>
              </View>
            ) : (
              <View className="flex flex-row items-center">
                <Avatar user={recipe.owner}></Avatar>
                <StyledText className="ml-2">{recipe.owner.username}</StyledText>
              </View>
            )}

            <View className="flex flex-row gap-x-1">
              <Pressable
                onPress={() => setIsDeleteModalVisible(true)}
                className="bg-rose-100 rounded-lg w-9 h-9 flex items-center justify-center border-2 border-rose-200"
              >
                <TrashCan width={14} height={14} color="#f43f5e" />
              </Pressable>
              <Pressable className="bg-white rounded-lg w-9 h-9 flex items-center justify-center border-2 border-gray-200">
                <PencilIcon width={14} height={14} color="#9ca3af" />
              </Pressable>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/recipes/[id]/share',
                    params: { id },
                  })
                }
                className="bg-white rounded-lg w-9 h-9 flex items-center justify-center border-2 border-gray-200"
              >
                <ShareIcon width={14} height={14} color="#9ca3af" />
              </Pressable>
            </View>
          </View>

          <View className="flex flex-row mt-4 gap-2 flex-wrap">
            <StyledText className="bg-white rounded-lg py-2 px-3 border-2 border-gray-300">
              {recipe.duration / 60} minutes
            </StyledText>
            <StyledText className="bg-white rounded-lg py-2 px-3 border-2 border-gray-300">
              {recipe.servings} servings
            </StyledText>
            <GeneratedFrom recipe={recipe} />
          </View>

          <View className="bg-white rounded-xl p-4 mt-4">
            <StyledText className="mb-2" weight="bold">
              Ingredients
            </StyledText>

            <View className="flex flex-col space-y-2">
              {recipe.ingredients.map(ingredient => (
                <View key={ingredient.id} className="flex flex-row gap-x-1 mb-2">
                  <StyledText>• {ingredient.value}</StyledText>
                </View>
              ))}
            </View>
          </View>

          {sections.map(section => (
            <View key={section.id} className="bg-white rounded-xl p-4 mt-6">
              <StyledText className="mb-4" weight="bold">
                {section.name}
              </StyledText>

              <View className="flex flex-col space-y-2">
                {section.directions
                  ?.sort((a, b) => a.number - b.number)
                  .map((step: RecipeDirectionWithCompleted) => {
                    return (
                      <RecipeDirectionComponent
                        key={step.id}
                        step={step}
                        section={section}
                        sections={sections}
                        setSections={setSections}
                      />
                    );
                  })}
              </View>
            </View>
          ))}
        </View>
      )}

      <ModalComponent modalVisible={isDeleteModalVisible} onClose={() => setIsDeleteModalVisible(false)}>
        <View className="flex flex-col">
          <StyledText className="text-xl mb-4" weight="bold">
            Delete Recipe
          </StyledText>
          <StyledText className="text-slate-500 mb-8">Are you sure you want to delete this recipe?</StyledText>
          <View className="flex flex-row justify-end gap-x-2">
            <ActionButton
              size="large"
              buttonBgColorClass="bg-slate-300"
              textClassName="text-slate-600"
              disabled={isDeleting}
              onPress={() => setIsDeleteModalVisible(false)}
              text="Cancel"
            />
            <ActionButton
              size="large"
              buttonClassName="bg-pastel-red text-white px-4 py-2 rounded-lg"
              buttonBgColorClass="bg-rose-500"
              isLoading={isDeleting}
              disabled={isDeleting}
              onPress={() => deleteRecipe().then(() => navigation.goBack())}
              text="Delete"
            />
          </View>
        </View>
      </ModalComponent>
    </Page>
  );
}
