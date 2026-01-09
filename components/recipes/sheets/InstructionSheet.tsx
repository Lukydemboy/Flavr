import { ActionButton, StyledText } from '@/components/ui';
import { InputField } from '@/components/ui/InputField';
import { RecipeDirection, RecipeSection } from '@/domain/types/recipe';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View } from 'react-native';

type Props = {
  onSave: (instruction: RecipeDirection, section: RecipeSection) => void;
};
export type InstructionSheetRef = { open: (instruction: RecipeDirection, section: RecipeSection) => void };

export const InstructionSheet = forwardRef<InstructionSheetRef, Props>(({ onSave }, ref) => {
  const [section, setSection] = useState<RecipeSection | null>(null);
  const [instruction, setInstruction] = useState<RecipeDirection | null>(null);
  InstructionSheet.displayName = 'InstructionSheet';
  const sheet = useRef<TrueSheet>(null);

  useImperativeHandle(ref, () => ({
    open: (instruction: RecipeDirection, section: RecipeSection) => {
      setInstruction(instruction);
      setSection(section);
    },
  }));

  useEffect(() => {
    if (instruction && section) {
      sheet.current?.present();
    }
  }, [instruction, section]);

  const onSaveHandler = () => {
    if (!instruction || !section) return;

    onSave(instruction, section);
    sheet.current?.dismiss();
  };

  const onDidDismiss = () => {
    setInstruction(null);
    setSection(null);
  };

  if (!instruction || !section) return null;

  return (
    <TrueSheet onDidDismiss={onDidDismiss} ref={sheet} detents={['auto']} cornerRadius={24}>
      <View className="p-4 pb-0">
        <StyledText className="text-xl mb-2 pt-2" weight="black">
          Add instruction to "{section?.name}"
        </StyledText>
        <StyledText className="text-slate-500 mb-6" weight="regular">
          Describe the instruction in detail, including any necessary ingredients, tools, and steps.
        </StyledText>

        <StyledText className="ml-2 mb-2" weight="bold">
          Instructions
        </StyledText>
        <InputField
          value={instruction!.instruction}
          className="border-2 border-slate-300 bg-white"
          placeholder="Wash the vegetables thoroughly"
          onChangeText={text => setInstruction({ ...instruction!, instruction: text })}
          multiline
        />

        <ActionButton
          viewClassName="mt-6"
          size="large"
          text="Save"
          disabled={!instruction?.instruction}
          onPress={onSaveHandler}
        />
      </View>
    </TrueSheet>
  );
});
