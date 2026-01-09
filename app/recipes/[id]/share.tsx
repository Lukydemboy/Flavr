import { CrossIcon } from '@/components/icons/Cross';
import { CircleLoader } from '@/components/loaders';
import { ActionButton, Page, StyledText, StyledTitle } from '@/components/ui';
import { InputField } from '@/components/ui/InputField';
import { Group } from '@/domain/types/group';
import { useGroups } from '@/queries/group';
import { useRecipe, useSetRecipeGroups } from '@/queries/recipe';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

export default function ShareRecipeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data: recipe, isLoading } = useRecipe(id);
  const { data: groups, isLoading: isGroupsLoading } = useGroups();
  const { mutateAsync: shareRecipe, isPending } = useSetRecipeGroups(id);

  useEffect(() => {
    if (recipe && groups && !isGroupsLoading) {
      setFilteredGroups(groups.content.filter(group => !selectedGroups.some(selected => selected.id === group.id)));
    }
  }, [recipe, groups, isGroupsLoading, selectedGroups]);

  useEffect(() => {
    if (recipe) {
      setSelectedGroups(recipe.groups || []);
    }
  }, [recipe]);

  if (isLoading || isGroupsLoading) {
    return (
      <Page>
        <View className="flex items-center justify-center">
          <CircleLoader />
        </View>
      </Page>
    );
  }

  return (
    <Page>
      <StyledTitle className="text-xl text-left font-bold mb-2 pt-6">Share recipe</StyledTitle>
      <StyledText className="text-slate-500 text-left mb-4">
        Select the groups you want the recipe to be shared with.
      </StyledText>
      <InputField
        placeholder="Search groups..."
        className="border border-gray-300 py-4 mb-4"
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
      />
      <ScrollView contentContainerClassName="grow mb-4 gap-1">
        {isLoading && <StyledText>Loading...</StyledText>}

        {!isLoading && groups?.content.length === 0 && <StyledText>You are not part of any group</StyledText>}

        {!isLoading &&
          filteredGroups.map(group => {
            return (
              <Pressable
                key={group.id}
                className="flex-row items-center p-4 bg-white rounded-xl border-2 border-slate-200"
                onPress={() => {
                  if (selectedGroups.includes(group)) {
                    setSelectedGroups(selectedGroups.filter(group => group.id !== group.id));
                  } else {
                    setSelectedGroups([...selectedGroups, group]);
                  }
                }}
              >
                <StyledText className="ml-2">{group.name}</StyledText>
              </Pressable>
            );
          })}
      </ScrollView>

      <ScrollView
        className="bg-white p-4 rounded-xl mt-4 max-h-[20%]"
        contentContainerClassName="flex flex-row flex-wrap gap-2"
      >
        {!selectedGroups.length && (
          <View>
            <StyledText className="text-gray-800" weight="semiBold">
              No groups selected yet
            </StyledText>
            <StyledText className="text-xs text-gray-400 mt-2">
              Start by searching users and tapping on the group&apos;s name to select them.
            </StyledText>
          </View>
        )}

        <StyledText className="text-slate-600 mb-1" weight="semiBold">
          Your recipe will be visible in the following groups:
        </StyledText>
        {selectedGroups.map(group => (
          <View
            key={group.id}
            className="flex-row items-center bg-white p-2 rounded-xl border-2 border-slate-200 gap-x-2"
          >
            <StyledText className="text-gray-500 text-sm">{group.name}</StyledText>
            <Pressable
              className="ml-auto h-6 w-6 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-md"
              onPress={() => {
                setSelectedGroups(selectedGroups.filter(g => g.id !== group.id));
              }}
            >
              <CrossIcon width={8} height={8} color="#9ca3af" />
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <ActionButton
        viewClassName="mt-4"
        size="large"
        disabled={isPending}
        isLoading={isPending}
        onPress={() => shareRecipe(selectedGroups).then(() => router.back())}
        text="Share recipe"
      />
    </Page>
  );
}
