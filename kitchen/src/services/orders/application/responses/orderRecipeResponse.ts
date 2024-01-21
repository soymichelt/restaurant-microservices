import { OrderResponse } from './orderResponse';

export type OrderRecipeResponse = OrderResponse & {
  recipeName?: string;
  recipeDescription?: string;
  recipePreparationMethod?: string;
};
