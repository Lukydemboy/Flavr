import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateSupportRequest = () => {
  return useMutation({
    mutationFn: async (data: { email: string; userId: string; appVersion: string; message: string }) => {
      return axios<void>({
        method: 'POST',
        url: '/support',
        data,
      }).then(res => res.data);
    },
  });
};
