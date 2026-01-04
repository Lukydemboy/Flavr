import {
  Filterable,
  Pageable,
  Paginated,
  Searchable,
  Sortable,
} from "@/domain/types/listings";
import { Recipe } from "@/domain/types/recipe";
import { Range } from "@/domain/types/range";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type RecipeFilters = {
  createdAt?: Partial<Range<Date>>;
};

export const recipeKeys = {
  all: ["recipe"] as const,
  lists: () => [...recipeKeys.all, "list"] as const,
  list: (filters: object) => [...recipeKeys.lists(), { filters }] as const,
  details: () => [...recipeKeys.all, "detail"] as const,
  detail: (id: string) => [...recipeKeys.details(), id] as const,
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      return axios({
        method: "POST",
        url: "/recipes",
        data,
      }).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
};

export const useGenerateRecipeFromInstagram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (url: string) => {
      return axios<Recipe>({
        method: "POST",
        url: "/recipes/generate/instagram",
        data: { url },
      }).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
};

export const useGenerateRecipeFromWebpage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (url: string) => {
      return axios<Recipe>({
        method: "POST",
        url: "/recipes/generate/webpage",
        data: { url },
      }).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });
    },
  });
};

export const useRecipes = (
  options: Searchable & Pageable & Sortable & Filterable<RecipeFilters>,
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
    queryKey: recipeKeys.list(params),
    queryFn: async () => {
      return axios<Paginated<Recipe>>({
        method: "GET",
        url: "/recipes",
        params,
      }).then((res) => res.data);
    },
  });
};

export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: async () => {
      return axios<Recipe>({
        method: "GET",
        url: `/recipes/${id}`,
      }).then((res) => res.data);
    },
  });
};
