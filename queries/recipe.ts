import { Filterable, Pageable, Paginated, Searchable, Sortable } from '@/domain/types/listings';
import { CreateRecipeInput, Recipe, UpdateRecipeInput } from '@/domain/types/recipe';
import { Range } from '@/domain/types/range';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ImageSource, ImageUtils } from '@/utils/image/image';
import { Platform } from 'react-native';
import { Group } from '@/domain/types/group';
import { Tag } from '@/domain/types/tag';

export type RecipeFilters = {
  createdAt?: Partial<Range<Date>>;
  tags?: Tag[];
};

export const recipeKeys = {
  all: ['recipe'] as const,
  lists: () => [...recipeKeys.all, 'list'] as const,
  list: (filters: object) => [...recipeKeys.lists(), { filters }] as const,
  details: () => [...recipeKeys.all, 'detail'] as const,
  detail: (id: string) => [...recipeKeys.details(), id] as const,
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRecipeInput) => {
      return axios({
        method: 'POST',
        url: '/recipes',
        data,
      }).then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateRecipeInput) => {
      return axios({
        method: 'PATCH',
        url: `/recipes/${data.id}`,
        data,
      }).then(res => res.data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: recipeKeys.detail(variables.id) });
    },
  });
};

export const useGenerateRecipeFromInstagram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (url: string) => {
      return axios<Recipe>({
        method: 'POST',
        url: '/recipes/generate/instagram',
        data: { url },
      }).then(res => res.data);
    },
    onSuccess: () => {
      console.log('Recipe generated from Instagram, invalidating query key', recipeKeys.lists());
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
};

export const useGenerateRecipeFromWebpage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (url: string) => {
      return axios<Recipe>({
        method: 'POST',
        url: '/recipes/generate/webpage',
        data: { url },
      }).then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
};

export const useGenerateRecipeFromImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (asset: ImageSource) => {
      const image = await ImageUtils.normalizeAssetToUploadFile(asset);

      const fileToUpload = {
        uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
        type: asset.mimeType || 'image/jpeg',
        name: asset.fileName || 'upload.jpg',
      };

      const formData = new FormData();
      formData.append('file', fileToUpload as any);

      return axios<Recipe>({
        method: 'POST',
        url: '/recipes/generate/image',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      }).then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
};

export const useRecipes = (options: Searchable & Pageable & Sortable & Filterable<RecipeFilters>) => {
  const { q, page, sort, filters } = options;

  const params = {
    q,
    page: page.number.toString(),
    size: page.size.toString(),
    orderBy: sort.property,
    sort: sort.direction,
    filters: JSON.stringify(filters),
  };

  return useQuery({
    queryKey: recipeKeys.list(params),
    queryFn: async () => {
      return axios<Paginated<Recipe>>({
        method: 'GET',
        url: '/recipes',
        params,
      }).then(res => res.data);
    },
  });
};

export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: async () => {
      return axios<Recipe>({
        method: 'GET',
        url: `/recipes/${id}`,
      }).then(res => res.data);
    },
  });
};

export const useDeleteRecipe = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return axios<void>({
        method: 'DELETE',
        url: `/recipes/${id}`,
      }).then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
};

export const useSetRecipeGroups = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (groups: Group[]) => {
      return axios<Recipe>({
        method: 'PUT',
        url: `/recipes/${id}/groups`,
        data: { groups },
      }).then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: recipeKeys.detail(id) });
    },
  });
};
