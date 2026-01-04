import {
  Filterable,
  Pageable,
  Paginated,
  Searchable,
  Sortable,
} from "@/domain/types/listings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateUser, User } from "@/context/authContext";
import { Range } from "@/domain/types/range";
import axios from "axios";

export const userKeys = {
  self: ["self"] as const,
  all: ["user"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: object) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export type UserFilters = {
  createdAt?: Partial<Range<Date>>;
};

export const useUser = () => {
  return useQuery({
    queryKey: userKeys.self,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      return axios<User>({
        method: "GET",
        url: "/users/me",
      }).then((res) => res.data);
    },
  });
};

export const useUsers = (
  options: Searchable & Pageable & Sortable & Filterable<UserFilters>,
) => {
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
        method: "GET",
        url: "/users",
        params,
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
        queryClient.invalidateQueries({ queryKey: userKeys.self });

        return res.data;
      });
    },
  });
};
