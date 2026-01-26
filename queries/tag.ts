import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Tag } from '@/domain/types/tag';
import { TagType } from '@/domain/enums/tag-type.enum';

export type TagFilters = {
  type?: TagType;
};

export const tagKeys = {
  all: ['tags'] as const,
  lists: () => [...tagKeys.all, 'list'] as const,
  list: (filters: TagFilters) => [...tagKeys.lists(), { filters }] as const,
  details: () => [...tagKeys.all, 'detail'] as const,
  detail: (id: string) => [...tagKeys.details(), id] as const,
};

export const useTags = (filters: TagFilters = {}) => {
  const params = { type: filters?.type };

  return useQuery({
    queryKey: tagKeys.list(filters),
    queryFn: async () => {
      return axios<Tag[]>({
        method: 'GET',
        url: '/tags',
        params,
      }).then(res => res.data);
    },
  });
};
