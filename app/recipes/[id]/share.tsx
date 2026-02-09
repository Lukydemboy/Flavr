import { CrossIcon } from '@/components/icons/Cross';
import { CircleLoader } from '@/components/loaders';
import { ActionButton, Page, StyledText } from '@/components/ui';
import { InputField } from '@/components/ui/InputField';
import { Group } from '@/domain/types/group';
import { useGroups } from '@/queries/group';
import { useRecipe, useSetRecipeGroups } from '@/queries/recipe';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, View } from 'react-native';

export default function ShareRecipeScreen() {
  const { t } = useTranslation();
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
      <StyledText className="text-slate-500 leading-relaxed text-left mb-4">
        {t('screen.shareRecipe.description')}
      </StyledText>
      <InputField
        placeholder={t('screen.shareRecipe.selectedList.search.placeholder')}
        className="border border-gray-300 py-4 mb-4"
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
      />
      <ScrollView contentContainerClassName="grow mb-4 gap-1 bg-white rounded-xl p-4">
        {isLoading && (
          <View className="items-center">
            <CircleLoader />
          </View>
        )}

        {!isLoading && filteredGroups?.length === 0 && (
          <StyledText className="text-sm text-slate-500">{t('screen.shareRecipe.list.empty')}</StyledText>
        )}

        {!isLoading &&
          filteredGroups.map(group => {
            return (
              <Pressable
                key={group.id}
                className="flex-row items-center p-3 bg-white rounded-xl border-2 border-slate-200"
                onPress={() => {
                  if (selectedGroups.includes(group)) {
                    setSelectedGroups(selectedGroups.filter(group => group.id !== group.id));
                  } else {
                    setSelectedGroups([...selectedGroups, group]);
                  }
                }}
              >
                <StyledText className="text-slate-700">{group.name}</StyledText>
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
            <StyledText className="text-gray-800" weight="black">
              {t('screen.shareRecipe.selectedList.title')}
            </StyledText>
            <StyledText className="text-xs text-gray-400 mt-2">
              {t('screen.shareRecipe.selectedList.description')}
            </StyledText>
          </View>
        )}

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
        text={t('screen.shareRecipe.action.submit')}
      />
    </Page>
  );
}
