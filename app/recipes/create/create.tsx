import { CrossIcon } from '@/components/icons/Cross';
import { ActionButton, Page, StyledText } from '@/components/ui';
import { InputField } from '@/components/ui/InputField';
import { useCreateRecipe } from '@/queries/recipe';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

type Step = 'General' | 'Ingredients' | 'Instructions';

export default function CreateRecipeScreen() {
  const [step, setStep] = useState<Step>('General');
  const [ingredients, setIngredients] = useState<{ value: string }[]>([]);
  const [instructions, setInstructions] = useState<{ number: number; instruction: string }[]>([]);

  const { mutateAsync: createRecipe } = useCreateRecipe();

  const form = useForm({
    defaultValues: {
      name: '',
      servings: '',
      duration: '',
      ingredient: '',
      instructions: '',
    },
    onSubmit: async ({ value }) => {
      await createRecipe(value);
    },
  });

  return (
    <Page>
      {step === 'General' && (
        <>
          <StyledText className="text-lg mb-2" weight="extraBold">
            Create recipe
          </StyledText>
          <StyledText className="text-sm mb-4 text-slate-500">
            Give some information about your recipe, the more information you give the easier it is to find for others!
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

          {/*<StyledText className="mb-2 ml-2" weight="bold">
            Courses
          </StyledText>
          <View className="p-4 bg-white rounded-xl mb-4">
            <StyledText className="text-slate-500">test</StyledText>
          </View>

          <StyledText className="mb-2 ml-2" weight="bold">
            Tags
          </StyledText>
          <View className="p-4 bg-white rounded-xl">
            <StyledText className="text-slate-500">test</StyledText>
          </View>*/}

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

          <form.Field name="instructions">
            {field => (
              <InputField
                className="mb-4 border-2 border-slate-200"
                value={field.state.value}
                onChangeText={text => form.setFieldValue('instructions', text)}
                placeholder="Describe what should happen, bring out your inner chef!"
                autoComplete="email"
                error={field.state.meta.errors?.join(', ')}
                onSubmitEditing={value => {
                  setInstructions([...instructions, { number: instructions.length + 1, instruction: value }]);
                  form.setFieldValue('instructions', '');
                }}
              />
            )}
          </form.Field>

          <ScrollView contentContainerClassName="bg-white rounded-xl bg-white p-4 grow mb-4 border-2 border-slate-200">
            {instructions.map((instruction, index) => (
              <View key={index} className="relative p-4 bg-slate-100 rounded-xl pl-9 mb-4">
                <View className="absolute top-2 -left-2 bg-pastel-green rounded-lg h-8 w-8 flex items-center justify-center shadow-sm">
                  <StyledText weight="black">{index + 1}</StyledText>
                </View>
                <StyledText className="leading-normal">{instruction.instruction}</StyledText>
                <View className="absolute right-2 top-0 bottom-0 flex items-center justify-center">
                  <Pressable
                    className="bg-slate-100 p-2 rounded-lg border-2 border-slate-200"
                    onPress={() => setInstructions(instructions.filter((_, i) => i !== index))}
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
              text="Back to ingredients"
              onPress={() => setStep('Ingredients')}
            />
            <ActionButton viewClassName="mt-auto grow" text="Instructions" onPress={() => setStep('Instructions')} />
          </View>
        </>
      )}
    </Page>
  );
}
