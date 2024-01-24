import { IngredientName } from '@services/ingredients/domain/valueObjects/ingredientName';

export interface MarketplaceService {
  buy(ingredientName: IngredientName): Promise<number>;
}
