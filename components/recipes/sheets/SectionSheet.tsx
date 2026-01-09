import { ActionButton, StyledText } from '@/components/ui';
import { InputField } from '@/components/ui/InputField';
import { RecipeSection } from '@/domain/types/recipe';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View } from 'react-native';

type Props = {
  onSave: (section: RecipeSection) => void;
};
export type SectionSheetRef = { open: (section: RecipeSection) => void };

export const SectionSheet = forwardRef<SectionSheetRef, Props>(({ onSave }, ref) => {
  const [section, setSection] = useState<RecipeSection | null>(null);
  SectionSheet.displayName = 'SectionSheet';
  const sheet = useRef<TrueSheet>(null);

  useImperativeHandle(ref, () => ({
    open: (section: RecipeSection) => {
      setSection(section);
    },
  }));

  useEffect(() => {
    if (section) {
      sheet.current?.present();
    }
  }, [section]);

  const onSaveHandler = () => {
    if (!section) return;

    onSave(section);
    sheet.current?.dismiss();
  };

  const onDidDismiss = () => {
    setSection(null);
  };

  if (!section) return null;

  return (
    <TrueSheet onDidDismiss={onDidDismiss} ref={sheet} detents={['auto']} cornerRadius={24}>
      <View className="p-4 pb-0">
        <StyledText className="text-xl mb-2 pt-2" weight="black">
          Create section
        </StyledText>
        <StyledText className="text-slate-500 mb-6" weight="regular">
          A section is a part of a recipe that contains a list of instructions. Each section can have its own name,
          description, and a list of steps.
        </StyledText>

        <StyledText className="ml-2 mb-2" weight="bold">
          Section name
        </StyledText>
        <InputField
          value={section.name}
          className="border-2 border-slate-300 bg-white"
          placeholder="Section name"
          onChangeText={text => setSection({ ...section, name: text })}
        />

        <StyledText className="ml-2 mb-2 mt-4" weight="bold">
          Section description
        </StyledText>
        <InputField
          value={section.description || ''}
          className="border-2 border-slate-300 bg-white"
          placeholder="Section description"
          onChangeText={text => setSection({ ...section, description: text })}
          multiline
        />

        <ActionButton viewClassName="mt-6" size="large" text="Save" disabled={!section?.name} onPress={onSaveHandler} />
      </View>
    </TrueSheet>
  );
});
