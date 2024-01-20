import { container } from '@di/shared';
import { GetAllRecipesUseCase } from '@services/recipes/application/useCases/getAll/getAllRecipesUseCase';
import { RecipeRepository } from '@services/recipes/domain/repositories/recipeRepository';
import { GetAllRecipesController } from '@services/recipes/infrastructure/functions/http/getAll/controller';
import { MongoRecipeRepository } from '@services/recipes/infrastructure/persistence/mongodb/mongoRecipeRepository';

container
  .register<RecipeRepository>('RecipeRepository', MongoRecipeRepository)
  .register<GetAllRecipesUseCase>('GetAllRecipesUseCase', GetAllRecipesUseCase)
  .register<GetAllRecipesController>('GetAllRecipesController', GetAllRecipesController);

export { container };
