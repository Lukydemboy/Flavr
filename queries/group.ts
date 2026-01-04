import { User } from "@/context/authContext";
import { Group } from "@/domain/types/group";
import { Paginated } from "@/domain/types/listings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const groupKeys = {
  all: ["group"] as const,
  lists: () => [...groupKeys.all, "list"] as const,
  list: (filters: object) => [...groupKeys.lists(), { filters }] as const,
  details: () => [...groupKeys.all, "detail"] as const,
  detail: (id: string) => [...groupKeys.details(), id] as const,
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      return axios({
        method: "POST",
        url: "/groups",
        data,
      })
        .then((res) => res.data)
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.lists() });
    },
  });
};

export const useGroups = () => {
  return useQuery({
    queryKey: groupKeys.lists(),
    queryFn: async () => {
      return axios<Paginated<Group>>({
        method: "GET",
        url: "/groups",
      }).then((res) => res.data);
    },
  });
};

export const useGroup = (id: string) => {
  return useQuery({
    queryKey: groupKeys.detail(id),
    queryFn: async () => {
      return axios<Group>({
        method: "GET",
        url: `/groups/${id}`,
      }).then((res) => res.data);
    },
  });
};

export const useKickMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { groupId: string; memberId: string }) => {
      return axios({
        method: "DELETE",
        url: `/groups/${data.groupId}/members/${data.memberId}`,
        data,
      }).then((res) => res.data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: groupKeys.detail(variables.groupId),
      });
    },
  });
};

// Members
export const useInviteUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { groupId: string; users: User[] }) => {
      const { groupId, users } = data;

      return axios({
        method: "POST",
        url: `/groups/${groupId}/members`,
        data: { users },
      }).then((res) => res.data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: groupKeys.detail(variables.groupId),
      });
    },
  });
};
