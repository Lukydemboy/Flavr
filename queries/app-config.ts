import { AppConfig } from '@/domain/types/app-config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAppConfig = () => {
  return useQuery({
    queryKey: ['app-config'],
    queryFn: async () => {
      return axios<AppConfig>({ method: 'GET', url: `/app-config` }).then(res => res.data);
    },
  });
};
