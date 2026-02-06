import { StyledText } from '@/components/ui';
import {
  Recipe,
  RecipeDirectionWithCompleted,
  RecipeIngredient,
  RecipeSectionWithDirections,
} from '@/domain/types/recipe';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import CheckIcon from '@/components/icons/Check';
import { RecipeDirectionComponent } from '../RecipeDirection';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useTranslation } from 'react-i18next';

type Props = {
  recipe: Recipe;
};

export const RecipeDetails = ({ recipe }: Props) => {
  const { t } = useTranslation();
  const [sections, setSections] = useState<RecipeSectionWithDirections[]>([]);
  const [completedIngredients, setCompletedIngredients] = useState<RecipeIngredient[]>([]);
  const [index, setIndex] = useState<number>(0);

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

  return (
    <View className="mt-8 w-full">
      <SegmentedControl
        values={[t('screen.recipe.details.ingredients'), t('screen.recipe.details.directions')]}
        fontStyle={{ fontFamily: 'Nunito' }}
        selectedIndex={index}
        onChange={event => {
          setIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />

      <View className="w-[95%] mx-auto">
        {index === 0 && (
          <View className="mt-4">
            <View className="flex flex-col space-y-2">
              {recipe.ingredients.map(ingredient => {
                const isCompleted = completedIngredients.some(item => item.id === ingredient.id);

                return (
                  <Pressable
                    key={ingredient.id}
                    onPress={() => {
                      setCompletedIngredients(prev => {
                        return prev.some(item => item.id === ingredient.id)
                          ? prev.filter(item => item.id !== ingredient.id)
                          : [...prev, ingredient];
                      });
                    }}
                    className={`flex flex-row items-center gap-x-3 mb-2 p-3 border border-slate-200 rounded-xl pr-12 ${isCompleted ? 'bg-primary-50' : ''}`}
                  >
                    <View
                      className={`w-7 h-7 border-2 flex items-center justify-center border-${isCompleted ? 'primary-500' : 'slate-200'} rounded-full ${isCompleted ? 'bg-primary-500' : ''} transition`}
                    >
                      {isCompleted && <CheckIcon width={12} height={12} color="#fff" />}
                    </View>
                    <StyledText className="text-slate-700 text-xs" weight="bold">
                      {ingredient.value}
                    </StyledText>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {index === 1 && (
          <View>
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
        )}
      </View>
    </View>
  );
};
