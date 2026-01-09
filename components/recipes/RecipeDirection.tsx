import {
  RecipeDirectionWithCompleted,
  RecipeSectionWithDirections,
} from "@/domain/types/recipe";
import { Pressable, View } from "react-native";
import { StyledText } from "../ui/StyledText";

type Props = {
  step: RecipeDirectionWithCompleted;
  section: RecipeSectionWithDirections;
  sections: RecipeSectionWithDirections[];
  setSections: (sections: RecipeSectionWithDirections[]) => void;
};

export const RecipeDirectionComponent = ({
  step,
  section,
  sections,
  setSections,
}: Props) => {
  const isCompleted = step.completed;

  return (
    <Pressable
      key={step.id}
      className={`relative flex flex-row gap-x-1 mb-4 p-4 rounded-lg ${isCompleted ? "bg-pastel-green" : "bg-gray-100"}`}
      onPress={() => {
        const updatedSections = sections.map((_section) => {
          if (_section.id === section.id) {
            const updatedDirections = _section.directions.map((direction) => {
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
      <View className="shadow-sm absolute -left-2 top-2 w-8 h-8 bg-pastel-green rounded-lg flex flex-row justify-center items-center">
        <StyledText>{step.number}</StyledText>
      </View>
      <StyledText key={step.id} className="ml-4 leading-normal">
        {step.instruction}
      </StyledText>
    </Pressable>
  );
};
