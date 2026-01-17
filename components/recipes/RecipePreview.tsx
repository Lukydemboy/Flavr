import { Recipe } from '@/domain/types/recipe';
import { useRouter } from 'expo-router';
import { Image, Pressable, View } from 'react-native';
import { StyledText } from '../ui';
import ClockIcon from '../icons/Clock';
import { Avatar } from '../ui/Avatar';

type Props = {
  recipe: Recipe;
  className?: string;
};

export const RecipePreview = ({ recipe, className }: Props) => {
  const router = useRouter();

  return (
    <Pressable
      key={recipe.id}
      className={`mb-2 ${className}`}
      onPress={() =>
        router.push({
          pathname: `/recipes/[id]`,
          params: { id: recipe.id, title: recipe.name },
        })
      }
    >
      {!!recipe.images.length ? (
        <Image className="w-full h-64 rounded-[2.5rem]" source={{ uri: recipe.images[0].url }} />
      ) : (
        <View className="w-full h-64 rounded-[2.5rem] bg-gray-200" />
      )}

      <View className="p-2">
        <StyledText className="font-bold mb-2" weight="bold">
          {recipe.name}
        </StyledText>

        <View className="flex flex-row items-center gap-x-1">
          <ClockIcon color="#32675E" width={14} height={14} />
          <StyledText className="text-sm">{recipe.duration / 60} minutes</StyledText>
        </View>

        {recipe.owner && (
          <View className="flex flex-row items-center gap-x-1 mt-2">
            <Avatar user={recipe.owner} size={25} className="rounded-full" />
            <StyledText className="text-sm">shared by {recipe.owner.username}</StyledText>
          </View>
        )}
      </View>
    </Pressable>
  );
};
