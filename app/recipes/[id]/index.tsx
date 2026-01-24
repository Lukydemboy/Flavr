import ChevronLeftIcon from '@/components/icons/ChevronLeft';
import PencilIcon from '@/components/icons/Pencil';
import ShareIcon from '@/components/icons/Share';
import TrashCanIcon from '@/components/icons/TrashCan';
import { CircleLoader } from '@/components/loaders';
import { ConfirmationModal } from '@/components/modals/ConfirmationModal';
import { RecipeDetails } from '@/components/recipes/detail/RecipeDetails';
import { GeneratedFrom } from '@/components/recipes/GeneratedFrom';
import { Page, StyledText } from '@/components/ui';
import { Avatar } from '@/components/ui/Avatar';
import { TagComponent } from '@/components/ui/Tag';
import { User } from '@/context/authContext';
import { useDeleteRecipe, useRecipe } from '@/queries/recipe';
import { useUser } from '@/queries/user';
import { Redirect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RecipeDetailScreen() {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { id, title, imageUrl } = useLocalSearchParams<{ id: string; title: string; imageUrl: string }>();
  const { data: user } = useUser();
  const { data: recipe, isLoading } = useRecipe(id);

  const { mutateAsync: deleteRecipe } = useDeleteRecipe(id);

  useEffect(() => navigation.setOptions({ title }), [navigation, title]);

  if (!user) {
    return <Redirect href={'/login'} />;
  }

  if (!recipe && !isLoading) {
    return <Redirect href={'/recipes'} />;
  }

  return (
    <Page className="relative" safeAreaTop={!recipe?.images.length && !imageUrl} container={false}>
      {(!!recipe?.images.length || imageUrl) && (
        <Image className="h-96 w-full" source={{ uri: recipe?.images?.[0]?.url ?? imageUrl }} />
      )}

      <>
        <View className="absolute z-10 flex flex-row items-start justify-between w-full" style={{ top: insets.top }}>
          <Pressable onPress={() => router.back()} className="bg-white shadow-md rounded-xl p-3 ml-4">
            <ChevronLeftIcon height={14} width={14} color="#000" />
          </Pressable>

          <View className="pr-4 flex flex-row">
            <Pressable onPress={() => setIsDeleteModalVisible(true)} className="bg-white shadow-md rounded-xl p-3 ml-2">
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
          <View
            className={`rounded-3xl bg-white p-4 mx-2 ${recipe?.images.length || imageUrl ? '-mt-24' : 'mt-24'} ${!recipe ? 'h-screen' : ''}`}
          >
            {isLoading && (
              <View className="items-center">
                <CircleLoader />
              </View>
            )}
            {recipe && (
              <View>
                <StyledText className="text-2xl mt-2 mb-1" weight="black">
                  {recipe?.name}
                </StyledText>

                {recipe.tags?.length && (
                  <View className="flex flex-row flex-wrap gap-1">
                    {recipe.tags.map((tag, index) => (
                      <TagComponent key={index} tag={tag} />
                    ))}
                  </View>
                )}

                {recipe.description && (
                  <StyledText className="text-slate-500 mt-2 mb-4 leading-relaxed">{recipe.description}</StyledText>
                )}

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
                    {t('screen.recipe.duration', { duration: recipe.duration / 60 })}
                  </StyledText>
                  <StyledText className="bg-white rounded-lg py-2 px-3 border-2 border-gray-300">
                    {t('screen.recipe.duration', { duration: recipe.servings / 60 })}
                  </StyledText>
                  <GeneratedFrom recipe={recipe} />
                </View>

                <RecipeDetails recipe={recipe} />
              </View>
            )}
          </View>
        </View>
      </>

      <ConfirmationModal
        title="Delete recipe"
        text="Are you sure you want to delete this recipe?"
        onConfirm={() =>
          deleteRecipe().then(() => {
            setIsDeleteModalVisible(false);
            router.back();
          })
        }
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
