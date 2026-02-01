import { Filterable, Pageable, Paginated, Searchable, Sortable } from '@/domain/types/listings';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Range } from '@/domain/types/range';
import axios from 'axios';
import { changeLanguage } from '@/i18n';
import { Allergen } from '@/domain/types/allergen';
import { Tag } from '@/domain/types/tag';
import { ImageUtils } from '@/utils/image/image';
import { Asset } from '@/domain/types/asset';
import { useUploadInternalAsset } from './asset';
import { User, UpdateUser, UpdateUserImage } from '@/domain/types/user';

export const userKeys = {
  self: ['self'] as const,
  all: ['user'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: object) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  allergies: ['self', 'allergies'] as const,
  dietaryPreferences: ['self', 'dietaryPreferences'] as const,
};

export type UserFilters = {
  createdAt?: Partial<Range<Date>>;
};

export const useUser = () => {
  return useQuery({
    queryKey: userKeys.self,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const user = await axios<User>({
        method: 'GET',
        url: '/users/me',
      }).then(res => res.data);

      if (user.preferences?.language) {
        changeLanguage(user.preferences.language);
      }

      return user;
    },
  });
};

export const useUsers = (options: Searchable & Pageable & Sortable & Filterable<UserFilters>) => {
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
    queryKey: userKeys.list(options),
    staleTime: 1000 * 60 * 3,
    queryFn: async () => {
      return axios<Paginated<User>>({
        method: 'GET',
        url: '/users',
        params,
      }).then(res => res.data);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Partial<UpdateUser>) => {
      return axios<User>({
        method: 'PATCH',
        url: '/users/me',
        data: user,
      }).then(res => {
        queryClient.invalidateQueries({ queryKey: userKeys.self });

        return res.data;
      });
    },
  });
};

export const useUpdateUserImage = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: uploadImage } = useUploadInternalAsset();

  return useMutation({
    mutationFn: async (data: UpdateUserImage) => {
      const { image } = data;
      let _image: Asset | undefined;

      if (image) {
        const file = await ImageUtils.normalizeAssetToUploadFile(image);
        _image = await uploadImage(file);
      }

      return axios<User>({
        method: 'PUT',
        url: '/users/me/image',
        data: { image: _image },
      }).then(res => {
        queryClient.invalidateQueries({ queryKey: userKeys.self });

        return res.data;
      });
    },
  });
};

export const useAllergies = () =>
  useQuery({
    queryKey: userKeys.allergies,
    queryFn: async () => {
      return axios<Allergen[]>({
        method: 'GET',
        url: '/users/me/allergies',
      }).then(res => res.data);
    },
  });

export const useUpdateAllergies = () => {
  return useMutation({
    mutationKey: userKeys.allergies,
    mutationFn: async (allergens: Allergen[]) => {
      return axios<Allergen[]>({
        method: 'PUT',
        url: `users/me/allergies`,
        data: { allergens },
      }).then(res => res.data);
    },
  });
};

export const useDietaryPreferences = () =>
  useQuery({
    queryKey: userKeys.dietaryPreferences,
    queryFn: async () => {
      return axios<Tag[]>({
        method: 'GET',
        url: '/users/me/dietary-preferences',
      }).then(res => res.data);
    },
  });

export const useUpdateDietaryPreferences = () => {
  return useMutation({
    mutationKey: userKeys.dietaryPreferences,
    mutationFn: async (preferences: Tag[]) => {
      return axios<Tag[]>({
        method: 'PUT',
        url: `users/me/dietary-preferences`,
        data: { preferences },
      }).then(res => res.data);
    },
  });
};
