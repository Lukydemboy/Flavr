import { User } from "@/context/authContext";

export type Recipe = {
  id: string;
  name: string;
  ingredients: RecipeIngredient[];
  sections: RecipeSection[];
  owner?: User;
};

export type RecipeIngredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
};

export type RecipeSection = {
  id: string;
  name: string;
  directions: RecipeDirection[];
};

export type RecipeDirection = {
  id: string;
  number: string;
  instruction: string;
};
