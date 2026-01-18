import { Range } from '@/domain/types/range';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Tag } from '@/domain/types/tag';

export type RecipeFilters = {
  createdAt?: Partial<Range<Date>>;
};

export const tagKeys = {
  all: ['tags'] as const,
  lists: () => [...tagKeys.all, 'list'] as const,
  list: (filters: object) => [...tagKeys.lists(), { filters }] as const,
  details: () => [...tagKeys.all, 'detail'] as const,
  detail: (id: string) => [...tagKeys.details(), id] as const,
};

export const useTags = () => {
  return useQuery({
    queryKey: tagKeys.all,
    queryFn: async () => {
      return axios<Tag[]>({
        method: 'GET',
        url: '/tags',
      }).then(res => res.data);
    },
  });
};
