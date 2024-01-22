import { container } from '@di/shared';
import { GetAllIngredientsUseCase } from '@services/ingredients/application/useCases/getAll/getAllIngredientsUseCase';
import { IngredientRepository } from '@services/ingredients/domain/repositories/ingredientRepository';
import { GetAllIngredientsController } from '@services/ingredients/infrastructure/functions/http/getAll/controller';
import { MongoIngredientRepository } from '@services/ingredients/infrastructure/persistence/mongodb/mongoIngredientRepository';

container
  .register<IngredientRepository>('IngredientRepository', MongoIngredientRepository)
  .register<GetAllIngredientsUseCase>('GetAllIngredientsUseCase', GetAllIngredientsUseCase)
  .register<GetAllIngredientsController>('GetAllIngredientsController', GetAllIngredientsController);

export { container };
