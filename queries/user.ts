import { UpdateUser, User } from "@/context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const userKeys = {
  user: ["user"] as const,
};

export const useUser = () => {
  return useQuery({
    queryKey: userKeys.user,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      return axios<User>({
        method: "GET",
        url: "/users/me",
      }).then((res) => res.data);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Partial<UpdateUser>) => {
      return axios<User>({
        method: "PATCH",
        url: "/users/me",
        data: user,
      }).then((res) => {
        queryClient.invalidateQueries({ queryKey: userKeys.user });

        return res.data;
      });
    },
  });
};
