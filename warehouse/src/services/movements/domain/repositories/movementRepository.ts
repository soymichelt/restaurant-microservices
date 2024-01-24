import { IngredientId } from '@services/ingredients/domain/valueObjects/ingredientId';
import { Movement } from '@services/movements/domain/movement';

export interface MovementRepository {
  all(ingredientId: IngredientId): Promise<Movement[]>;
  update(movement: Movement): Promise<void>;
}
