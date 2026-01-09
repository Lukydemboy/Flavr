import { User } from '@/context/authContext';
import { Group } from './group';

export type Recipe = {
  id: string;
  name: string;
  duration: number;
  servings: number;
  generatedFrom: string | null;
  ingredients: RecipeIngredient[];
  sections: RecipeSection[];
  groups?: Group[];
  owner?: User;
};

export type RecipeIngredient = {
  id: string;
  value: string;
};

export type RecipeSection = {
  id: string;
  name: string;
  description: string | null;
  directions: RecipeDirection[];
};

export type RecipeDirection = {
  id: string;
  number: number;
  instruction: string;
};

export type RecipeSectionWithDirections = RecipeSection & {
  directions: RecipeDirectionWithCompleted[];
};

export type RecipeDirectionWithCompleted = RecipeDirection & {
  completed: boolean;
};

export type CreateRecipeInput = {
  name: string;
  duration: number;
  servings: number;
  ingredients: Omit<RecipeIngredient, 'id'>[];
  sections: RecipeSection[];
  groups?: Group[];
  owner?: User;
};
