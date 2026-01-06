import { User } from "@/context/authContext";
import { Group } from "./group";

export type Recipe = {
  id: string;
  name: string;
  duration: number;
  servings: number;
  ingredients: RecipeIngredient[];
  sections: RecipeSection[];
  groups?: Group[];
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
