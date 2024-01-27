import { Ingredient } from '@services/ingredients/domain/ingredient';
import { IngredientId } from '@services/ingredients/domain/valueObjects/ingredientId';

export interface IngredientRepository {
  all(ingredientIds?: IngredientId[]): Promise<Ingredient[]>;
  find(ingredientId: IngredientId): Promise<Ingredient>;
  update(ingredient: Ingredient): Promise<void>;
}
