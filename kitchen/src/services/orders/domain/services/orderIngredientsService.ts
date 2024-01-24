export type IngredientsToRequest = {
  ingredientId: string;
  quantity: number;
};

export interface OrderIngredientsService {
  orderIngredients(ingredients: IngredientsToRequest[]): Promise<boolean>;
}
