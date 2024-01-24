export type OrderIngredientStockRequest = {
  ingredients: {
    ingredientId: string;
    quantity: number;
  }[];
};
