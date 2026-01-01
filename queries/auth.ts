import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useRequestMagicLink = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return axios({
        method: "POST",
        url: `/auth/magic-link`,
        data: { email },
      });
    },
  });
};
