import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Allergen } from '@/domain/types/allergen';

export const allergenKeys = {
  all: ['allergens'] as const,
  lists: () => [...allergenKeys.all, 'list'] as const,
  list: (filters: object) => [...allergenKeys.lists(), { filters }] as const,
  details: () => [...allergenKeys.all, 'detail'] as const,
  detail: (id: string) => [...allergenKeys.details(), id] as const,
};

export const useAllergens = () => {
  return useQuery({
    queryKey: allergenKeys.all,
    queryFn: async () => {
      return axios<Allergen[]>({
        method: 'GET',
        url: '/allergens',
      }).then(res => res.data);
    },
  });
};
