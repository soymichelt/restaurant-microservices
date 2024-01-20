import { Recipe } from '@services/recipes/domain/recipe';
import { RecipeId } from '@services/recipes/domain/valueObjects/recipeId';

export interface RecipeRepository {
  all(): Promise<Recipe[]>;
  find(recipeId: RecipeId): Promise<Recipe>;
  update(recipe: Recipe): Promise<void>;
}
