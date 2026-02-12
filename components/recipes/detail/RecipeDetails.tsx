import { StyledText } from '@/components/ui';
import {
  Recipe,
  RecipeDirectionWithCompleted,
  RecipeIngredient,
  RecipeSection,
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
  const [index, setIndex] = useState<number>(0);

  return (
    <View className="mt-8 w-full">
      <View className="hidden sm:block">
        <View className="flex flex-row justify-between">
          <RecipeDetailsIngredients ingredients={recipe.ingredients} />
          <View className="px-4 w-[65%]">
            <RecipeDetailsSections sections={recipe.sections} />
          </View>
        </View>
      </View>

      <View className="sm:hidden">
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
              <RecipeDetailsIngredients ingredients={recipe.ingredients} />
            </View>
          )}

          {index === 1 && <RecipeDetailsSections sections={recipe.sections} />}
        </View>
      </View>
    </View>
  );
};

const RecipeDetailsIngredients = ({ ingredients }: { ingredients: RecipeIngredient[] }) => {
  const [completedIngredients, setCompletedIngredients] = useState<RecipeIngredient[]>([]);

  return (
    <View className="flex flex-col space-y-2">
      {ingredients.map(ingredient => {
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
  );
};

const RecipeDetailsSections = ({ sections }: { sections: RecipeSection[] }) => {
  const [_sections, setSections] = useState<RecipeSectionWithDirections[]>([]);

  useEffect(() => {
    if (!sections) return;
    setSections(
      sections.map(section => ({
        ...section,
        directions: section.directions.map(direction => ({
          ...direction,
          completed: false,
        })),
      })),
    );
  }, [sections]);

  return (
    <View>
      {_sections.map(section => (
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
                    section={section as RecipeSectionWithDirections}
                    sections={sections as RecipeSectionWithDirections[]}
                    setSections={setSections}
                  />
                );
              })}
          </View>
        </View>
      ))}
    </View>
  );
};
