import { Recipe } from '@/domain/types/recipe';
import { useRouter } from 'expo-router';
import { Image, Pressable, View } from 'react-native';
import { StyledText } from '../ui';

type Props = {
  recipe: Recipe;
  className?: string;
};

export const RecipePreview = ({ recipe, className }: Props) => {
  const router = useRouter();

  return (
    <Pressable
      key={recipe.id}
      className={`bg-white rounded-2xl mb-2 ${className}`}
      onPress={() =>
        router.push({
          pathname: `/recipes/[id]`,
          params: { id: recipe.id, title: recipe.name },
        })
      }
    >
      {!!recipe.images.length && (
        <Image className="w-full h-32 rounded-tl-xl rounded-tr-xl" src={recipe.images[0].url} />
      )}

      <View className="p-4">
        <StyledText className="text-lg font-bold mb-2" weight="bold">
          {recipe.name}
        </StyledText>

        <View className="flex flex-row items-center justify-between">
          <StyledText>{recipe.duration / 60} minutes</StyledText>
        </View>
      </View>
    </Pressable>
  );
};
