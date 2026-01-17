import { RecipeDirectionWithCompleted, RecipeSectionWithDirections } from '@/domain/types/recipe';
import { Pressable, View } from 'react-native';
import { StyledText } from '../ui/StyledText';

type Props = {
  step: RecipeDirectionWithCompleted;
  section: RecipeSectionWithDirections;
  sections: RecipeSectionWithDirections[];
  setSections: (sections: RecipeSectionWithDirections[]) => void;
};

export const RecipeDirectionComponent = ({ step, section, sections, setSections }: Props) => {
  const isCompleted = step.completed;

  return (
    <Pressable
      key={step.id}
      className="relative flex flex-row gap-x-1 mb-10 pr-6"
      onPress={() => {
        const updatedSections = sections.map(_section => {
          if (_section.id === section.id) {
            const updatedDirections = _section.directions.map(direction => {
              if (direction.id !== step.id) {
                return direction;
              }
              return { ...direction, completed: !isCompleted };
            });
            return { ..._section, directions: updatedDirections };
          }

          return _section;
        }) as RecipeSectionWithDirections[];

        setSections(updatedSections);
      }}
    >
      <View className="w-10 h-10 bg-primary-500 rounded-full shadow-sm flex flex-row justify-center items-center">
        <StyledText className="text-white" weight="bold">
          {step.number}
        </StyledText>
      </View>
      <View>
        <StyledText key={step.id} className="ml-4 leading-relaxed text-slate-600 pr-6">
          {step.instruction}
        </StyledText>
      </View>
    </Pressable>
  );
};
