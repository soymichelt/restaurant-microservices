import { Recipe } from '@services/recipes/domain/recipe';
import { RecipeId } from '@shared/domain/valueObjects/recipeId';

export interface RecipeRepository {
  all(): Promise<Recipe[]>;
  find(recipeId: RecipeId): Promise<Recipe>;
  findRand(): Promise<Recipe>;
  update(recipe: Recipe): Promise<void>;
}
