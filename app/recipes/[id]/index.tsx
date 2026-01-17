import BulletsIcon from '@/components/icons/Bullets';
import ChevronLeftIcon from '@/components/icons/ChevronLeft';
import PencilIcon from '@/components/icons/Pencil';
import ShareIcon from '@/components/icons/Share';
import TrashCanIcon from '@/components/icons/TrashCan';
import { CircleLoader } from '@/components/loaders';
import { ConfirmationModal } from '@/components/modals/ConfirmationModal';
import { GeneratedFrom } from '@/components/recipes/GeneratedFrom';
import { RecipeDirectionComponent } from '@/components/recipes/RecipeDirection';
import { Page, StyledText } from '@/components/ui';
import { Avatar } from '@/components/ui/Avatar';
import { User } from '@/context/authContext';
import { RecipeDirectionWithCompleted, RecipeSectionWithDirections } from '@/domain/types/recipe';
import { useDeleteRecipe, useRecipe } from '@/queries/recipe';
import { useUser } from '@/queries/user';
import { Redirect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RecipeDetailScreen() {
  const [sections, setSections] = useState<RecipeSectionWithDirections[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const { data: user } = useUser();
  const { data: recipe, isLoading } = useRecipe(id);

  const { mutateAsync: deleteRecipe } = useDeleteRecipe(id);

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
    <Page className="relative" container={false}>
      {recipe && (
        <>
          <View className="absolute z-10 flex flex-row items-start justify-between w-full" style={{ top: insets.top }}>
            <Pressable onPress={() => router.back()} className="bg-white shadow-md rounded-xl p-3 ml-4">
              <ChevronLeftIcon height={14} width={14} color="#000" />
            </Pressable>

            <View className="pr-4 flex flex-row">
              <Pressable
                onPress={() => setIsDeleteModalVisible(true)}
                className="bg-white shadow-md rounded-xl p-3 ml-2"
              >
                <TrashCanIcon width={14} height={14} color="#f43f5e" />
              </Pressable>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/recipes/create/create',
                    params: { id },
                  })
                }
                className="bg-white shadow-md rounded-xl p-3 ml-2"
              >
                <PencilIcon height={14} width={14} color="#000" />
              </Pressable>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/recipes/[id]/share',
                    params: { id },
                  })
                }
                className="bg-white shadow-md rounded-xl p-3 ml-2"
              >
                <ShareIcon height={14} width={14} color="#000" />
              </Pressable>
            </View>
          </View>
          <View className="mb-10">
            {!!recipe.images.length && <Image className="h-96 w-full" source={{ uri: recipe.images[0].url }} />}

            <View className="rounded-tr-3xl rounded-tl-3xl -mt-24 bg-white p-4 mx-1">
              <StyledText className="text-2xl mt-2" weight="black">
                {recipe?.name}
              </StyledText>

              <View className="mt-2 flex flex-row justify-between border border-slate-200 bg-slate-50 rounded-xl p-3">
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

              <View className="bg-white rounded-xl mt-8">
                <StyledText className="text-2xl mb-4" weight="black">
                  Ingredients
                </StyledText>

                <View className="flex flex-col space-y-2">
                  {recipe.ingredients.map(ingredient => (
                    <View
                      key={ingredient.id}
                      className="flex flex-row items-center gap-x-3 mb-2 p-4 border border-slate-200 rounded-xl pr-8"
                    >
                      <View className="w-8 h-8 border-2 border-slate-200 rounded-full"></View>
                      <StyledText className="text-slate-700" weight="bold">
                        {ingredient.value}
                      </StyledText>
                    </View>
                  ))}
                </View>
              </View>

              {sections.map(section => (
                <View key={section.id} className="mt-6">
                  <StyledText className="mb-8 text-2xl" weight="black">
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
          </View>
        </>
      )}

      <ConfirmationModal
        title="Delete recipe"
        text="Are you sure you want to delete this recipe?"
        onConfirm={() => deleteRecipe().then(() => setIsDeleteModalVisible(false))}
        isLoading={isLoading}
        cancelText="Cancel"
        confirmText="Delete"
        isModalVisible={isDeleteModalVisible}
        setIsModalVisible={setIsDeleteModalVisible}
        isDestructive
      />
    </Page>
  );
}
