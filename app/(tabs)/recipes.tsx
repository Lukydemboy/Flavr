import { CrossIcon } from '@/components/icons/Cross';
import PlusIcon from '@/components/icons/Plus';
import { CircleLoader } from '@/components/loaders';
import { RecipePreview } from '@/components/recipes/RecipePreview';
import { CreateRecipeOptionsSheet } from '@/components/sheets/CreateRecipeOptionsSheet';
import { Page, StyledText } from '@/components/ui';
import { InputField } from '@/components/ui/InputField';
import { Paginated } from '@/domain/types/listings';
import { Recipe } from '@/domain/types/recipe';
import { Tag } from '@/domain/types/tag';
import { useTags } from '@/queries/tag';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useState } from 'react';
import { FlatList, Pressable, RefreshControl, ScrollView, View } from 'react-native';

const initialPage = { number: 1, size: 10 };

export default function RecipesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const sheetRef = useRef<CreateRecipeOptionsSheet>(null);

  const { data: tags } = useTags();
  const { data, isLoading, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ['recipes', searchQuery, activeTags],
    queryFn: async ({ pageParam }) => {
      const params = {
        q: searchQuery,
        page: pageParam.number.toString(),
        size: pageParam.size.toString(),
        filters: JSON.stringify({ tags: activeTags }),
      };

      return axios<Paginated<Recipe>>({
        method: 'GET',
        url: '/recipes',
        params,
      }).then(res => res.data);
    },
    initialPageParam: initialPage,
    getNextPageParam: lastPage => {
      if (lastPage.number && lastPage.number < lastPage.totalPages) {
        return { number: lastPage.number + 1, size: 10 };
      }
    },
  });

  return (
    <>
      <Page safeAreaTop scrollEnabled={false} className="gap-y-4 mb-28">
        <View className="relative">
          <InputField
            placeholder="Search recipes..."
            className="border border-gray-300 py-4 mb-4"
            onChangeText={query => setSearchQuery(query)}
            value={searchQuery}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
            contentContainerClassName="gap-x-2"
          >
            {tags?.map(tag => (
              <Pressable
                key={tag.id}
                onPress={() =>
                  setActiveTags(prev => (prev.includes(tag) ? prev.filter(t => t.id !== tag.id) : [...prev, tag]))
                }
                className={`px-4 py-2 rounded-full border transition ${activeTags.includes(tag) ? 'bg-primary-500 border-primary-500' : 'bg-white border-primary-50'}`}
              >
                <StyledText
                  className={`text-sm ${activeTags.includes(tag) ? 'text-white' : 'text-slate-800'}`}
                  weight="bold"
                >
                  {tag.name}
                </StyledText>
              </Pressable>
            ))}
          </ScrollView>

          {searchQuery && (
            <View className="absolute top-0 right-0">
              <Pressable onPress={() => setSearchQuery('')} className="bg-gray-200 p-2 rounded-lg top-1/2 right-2">
                <StyledText className="text-sm">
                  <CrossIcon width={8} height={8} />
                </StyledText>
              </Pressable>
            </View>
          )}
        </View>

        {isLoading && (
          <View className="p-4 flex items-center justify-center rounded-lg mb-2">
            <CircleLoader />
          </View>
        )}

        {!isLoading && !data?.pages?.flatMap(page => page?.content || []).length && (
          <View className="p-4 rounded-lg mb-2">
            <StyledText className="text-lg font-bold">No recipes found</StyledText>
          </View>
        )}

        <FlatList
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
          numColumns={2}
          data={data?.pages.flatMap(page => page.content || [])}
          showsVerticalScrollIndicator={false}
          onEndReached={() => fetchNextPage()}
          columnWrapperClassName="gap-4"
          renderItem={({ item }) => <RecipePreview recipe={item} className="w-1/2" />}
          keyExtractor={item => item.id}
        />
      </Page>

      <Pressable
        onPress={() => sheetRef.current?.open()}
        className="absolute bottom-4 right-2 z-10 w-12 h-12 bg-primary-500 flex items-center justify-center rounded-full shadow-sm"
      >
        <PlusIcon color="#fff" width={14} height={14} />
      </Pressable>
      <CreateRecipeOptionsSheet ref={sheetRef} />
    </>
  );
}
