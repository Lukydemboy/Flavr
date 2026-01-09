import { CrossIcon } from '@/components/icons/Cross';
import PencilIcon from '@/components/icons/Pencil';
import TrashCanIcon from '@/components/icons/TrashCan';
import { SectionSheet, SectionSheetRef } from '@/components/recipes/sheets/SectionSheet';
import { InstructionSheet, InstructionSheetRef } from '@/components/recipes/sheets/InstructionSheet';
import { ConfirmationSheet, ConfirmationSheetRef } from '@/components/sheets/ConfirmationSheet';
import { ActionButton, Page, StyledText } from '@/components/ui';
import { InputField } from '@/components/ui/InputField';
import { Recipe, RecipeDirection, RecipeSection } from '@/domain/types/recipe';
import { useCreateRecipe, useRecipe } from '@/queries/recipe';
import { useForm, uuid } from '@tanstack/react-form';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

type Step = 'General' | 'Ingredients' | 'Instructions';

export default function CreateRecipeScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('General');
  const [ingredients, setIngredients] = useState<{ value: string }[]>([]);
  const [sections, setSections] = useState<RecipeSection[]>([]);
  const [selectedSection, setSelectedSection] = useState<RecipeSection | null>(null);
  const [selectedInstruction, setSelectedInstruction] = useState<RecipeDirection | null>(null);
  const sectionSheetRef = useRef<SectionSheetRef>(null);
  const stepSheetRef = useRef<InstructionSheetRef>(null);
  const confirmationSheetSectionRef = useRef<ConfirmationSheetRef>(null);
  const confirmationSheetStepRef = useRef<ConfirmationSheetRef>(null);
  const { id } = useLocalSearchParams<{ id: string }>();

  const { mutateAsync: createRecipe } = useCreateRecipe();
  const { data: recipe } = useRecipe(id);

  useEffect(() => {
    setIngredients(recipe?.ingredients.map(ingredient => ({ value: ingredient.value })) ?? []);
    setSections(recipe?.sections ?? []);
  }, [recipe]);

  const form = useForm({
    defaultValues: {
      name: recipe?.name ?? '',
      servings: recipe?.servings.toString() ?? '',
      duration: recipe?.duration ? (recipe.duration / 60).toString() : '',
      ingredient: '',
      instructions: '',
    },
    onSubmit: async ({ value }) => {
      await createRecipe({
        ...value,
        servings: parseInt(value.servings),
        duration: parseInt(value.duration) * 60,
        ingredients,
        sections,
      }).then(recipe => {
        router.replace(`/recipes/${recipe.id}`);
      });
    },
  });

  return (
    <>
      <Page>
        {step === 'General' && (
          <>
            <StyledText className="text-lg mb-2" weight="extraBold">
              Create recipe
            </StyledText>
            <StyledText className="text-sm mb-4 text-slate-500">
              Give some information about your recipe, the more information you give the easier it is to find for
              others!
            </StyledText>

            <StyledText className="mb-2 ml-2" weight="bold">
              Name
            </StyledText>
            <form.Field name="name">
              {field => (
                <InputField
                  value={field.state.value}
                  onChangeText={text => form.setFieldValue('name', text)}
                  placeholder="Recipe name"
                  className="mb-4"
                  error={field.state.meta.errors?.join(', ')}
                />
              )}
            </form.Field>

            <StyledText className="mb-2 ml-2" weight="bold">
              Servings
            </StyledText>
            <form.Field name="servings">
              {field => (
                <InputField
                  value={field.state.value}
                  onChangeText={text => form.setFieldValue('servings', text)}
                  placeholder="Number of servings"
                  keyboardType="numeric"
                  className="mb-4"
                  error={field.state.meta.errors?.join(', ')}
                />
              )}
            </form.Field>

            <StyledText className="mb-2 ml-2" weight="bold">
              Duration
            </StyledText>
            <form.Field name="duration">
              {field => (
                <InputField
                  value={field.state.value}
                  onChangeText={text => form.setFieldValue('duration', text)}
                  placeholder="Number of duration (in minutes)"
                  keyboardType="numeric"
                  className="mb-4"
                  error={field.state.meta.errors?.join(', ')}
                />
              )}
            </form.Field>

            <ActionButton viewClassName="mt-auto" text="Ingredients" onPress={() => setStep('Ingredients')} />
          </>
        )}

        {step === 'Ingredients' && (
          <>
            <StyledText className="text-xl mb-2" weight="black">
              Ingredients
            </StyledText>
            <StyledText className="mb-4 text-slate-500">You can&lsquo;t cook without ingredients!</StyledText>

            <form.Field name="ingredient">
              {field => (
                <InputField
                  className="mb-4 border-2 border-slate-200"
                  value={field.state.value}
                  onChangeText={text => form.setFieldValue('ingredient', text)}
                  placeholder="500g noodles"
                  autoComplete="email"
                  error={field.state.meta.errors?.join(', ')}
                  onSubmitEditing={value => {
                    setIngredients([...ingredients, { value }]);
                    form.setFieldValue('ingredient', '');
                  }}
                />
              )}
            </form.Field>

            <ScrollView contentContainerClassName="bg-white rounded-xl bg-white p-4 grow mb-4 border-2 border-slate-200">
              {ingredients.map((ingredient, index) => (
                <View key={index} className="relative flex flex-row gap-x-1 mb-2 bg-background p-4 rounded-xl">
                  <StyledText className="text-slate-700">{ingredient.value}</StyledText>
                  <View className="absolute right-2 top-0 bottom-0 flex items-center justify-center">
                    <Pressable
                      className="bg-slate-100 p-2 rounded-lg border-2 border-slate-200"
                      onPress={() => setIngredients(ingredients.filter((_, i) => i !== index))}
                    >
                      <CrossIcon width={9} height={9} color="#9ca3af" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View className="flex flex-row gap-x-2">
              <ActionButton
                buttonBgColorClass="bg-gray-300"
                viewClassName="mt-auto"
                textClassName="text-slate-800"
                text="Back to general"
                onPress={() => setStep('General')}
              />
              <ActionButton viewClassName="mt-auto grow" text="Instructions" onPress={() => setStep('Instructions')} />
            </View>
          </>
        )}

        {step === 'Instructions' && (
          <>
            <StyledText className="text-xl mb-2" weight="black">
              Instructions
            </StyledText>
            <StyledText className="mb-4 text-slate-500">You can&lsquo;t cook without ingredients!</StyledText>

            <ScrollView contentContainerClassName="grow">
              {sections.map((section, index) => (
                <View key={index} className="relative rounded-xl bg-white p-4  mb-4 border-2 border-slate-200">
                  <View className="flex flex-row justify-between items-center gap-x-4 mb-2 ">
                    <StyledText className="text-xl" weight="black">
                      {section.name}
                    </StyledText>

                    <View className="flex flex-row gap-x-2">
                      <Pressable
                        className="bg-slate-100 p-2 rounded-lg border-2 border-slate-200"
                        onPress={() => setSections(sections.filter((_, i) => i !== index))}
                      >
                        <PencilIcon width={12} height={12} color="#9ca3af" />
                      </Pressable>
                      <Pressable
                        className="bg-rose-100 p-2 rounded-lg border-2 border-rose-200"
                        onPress={() => {
                          setSelectedSection(section);
                          confirmationSheetSectionRef.current?.open();
                        }}
                      >
                        <TrashCanIcon width={12} height={12} color="#f43f5e" />
                      </Pressable>
                    </View>
                  </View>
                  {section.description && (
                    <StyledText className="text-slate-500 mb-4">{section.description}</StyledText>
                  )}

                  {section.directions.map((direction, index) => (
                    <View key={index} className="relative p-4 bg-slate-100 rounded-xl pl-9 mb-8">
                      <View className="absolute top-2 -left-2 bg-pastel-green rounded-lg h-8 w-8 flex items-center justify-center shadow-sm">
                        <StyledText weight="black">{index + 1}</StyledText>
                      </View>
                      <View className="flex flex-row justify-end gap-x-2">
                        <Pressable
                          className="bg-slate-100 p-2 rounded-lg border-2 border-slate-200"
                          onPress={() => stepSheetRef.current?.open(direction, section)}
                        >
                          <PencilIcon width={12} height={12} color="#9ca3af" />
                        </Pressable>
                        <Pressable
                          className="bg-rose-100 p-2 rounded-lg border-2 border-rose-200"
                          onPress={() => {
                            setSelectedSection(section);
                            setSelectedInstruction(direction);
                            confirmationSheetStepRef.current?.open();
                          }}
                        >
                          <TrashCanIcon width={12} height={12} color="#f43f5e" />
                        </Pressable>
                      </View>

                      <StyledText className="leading-normal mr-6">{direction.instruction}</StyledText>
                    </View>
                  ))}

                  <Pressable
                    onPress={() =>
                      stepSheetRef.current?.open(
                        { id: uuid(), instruction: '', number: section.directions.length + 1 },
                        section,
                      )
                    }
                    className="border-2 border-slate-300 border-dashed p-3 rounded-xl mt-4 mb-4"
                  >
                    <StyledText className="uppercase text-slate-400 text-center text-sm" weight="black">
                      Add step
                    </StyledText>
                  </Pressable>
                </View>
              ))}

              <Pressable
                onPress={() => sectionSheetRef.current?.open({ id: uuid(), name: '', description: '', directions: [] })}
                className="border-2 border-slate-300 border-dashed p-4 rounded-xl mb-4"
              >
                <StyledText className="uppercase text-slate-400 text-center" weight="black">
                  Add section
                </StyledText>
              </Pressable>
            </ScrollView>

            <View className="flex flex-row gap-x-2 mb-4">
              <ActionButton
                buttonBgColorClass="bg-gray-300"
                viewClassName="mt-auto"
                textClassName="text-slate-800"
                text="Back to ingredients"
                onPress={() => setStep('Ingredients')}
              />

              <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <ActionButton
                    viewClassName="grow"
                    text="Save"
                    isLoading={isSubmitting}
                    disabled={!canSubmit}
                    onPress={() => form.handleSubmit()}
                  />
                )}
              </form.Subscribe>
            </View>
          </>
        )}
      </Page>

      <SectionSheet ref={sectionSheetRef} onSave={section => setSections([...sections, section])} />
      <InstructionSheet
        ref={stepSheetRef}
        onSave={(step, section) => {
          section.directions.push(step);
          const updatedSections = sections.map(s => (s.id === section.id ? section : s));
          setSections(updatedSections);
        }}
      />
      <ConfirmationSheet
        ref={confirmationSheetSectionRef}
        title="Are you sure?"
        text="Deleting this section will remove all its steps. This can't be undone."
        buttonText="Delete"
        onSubmit={() => {
          if (!selectedSection) return;
          setSections(sections.filter(section => section.id !== selectedSection.id));
        }}
        isDestructive
      />
      <ConfirmationSheet
        ref={confirmationSheetStepRef}
        title="Are you sure?"
        text="Deleting this step can't be undone."
        buttonText="Delete"
        onSubmit={() => {
          if (!selectedInstruction || !selectedSection) return;

          const section = sections.find(section => section.id === selectedSection.id);
          if (section) {
            section.directions = section.directions.filter(direction => direction.id !== selectedInstruction.id);
            const updatedSections = sections.map(s => (s.id === section.id ? section : s));
            setSections(updatedSections);
          }
        }}
        isDestructive
      />
    </>
  );
}
