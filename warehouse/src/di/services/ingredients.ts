import { container } from '@di/shared';
import { GetIngredientUseCase } from '@services/ingredients/application/useCases/get/getIngredientUseCase';
import { GetAllIngredientsUseCase } from '@services/ingredients/application/useCases/getAll/getAllIngredientsUseCase';
import { OrderIngredientStockUseCase } from '@services/ingredients/application/useCases/orderStock/orderIngredientStockUseCase';
import { IngredientRepository } from '@services/ingredients/domain/repositories/ingredientRepository';
import { MarketplaceService } from '@services/ingredients/domain/services/marketplaceService';
import { GetIngredientController } from '@services/ingredients/infrastructure/functions/http/get/controller';
import { GetAllIngredientsController } from '@services/ingredients/infrastructure/functions/http/getAll/controller';
import { OrderIngredientStockController } from '@services/ingredients/infrastructure/functions/http/orderStock/controller';
import { MongoIngredientRepository } from '@services/ingredients/infrastructure/persistence/mongodb/mongoIngredientRepository';
import { MarketplaceServiceImplemented } from '@services/ingredients/infrastructure/services/marketplace/marketplaceService';

container
  .register<IngredientRepository>('IngredientRepository', MongoIngredientRepository)
  .register<MarketplaceService>('MarketplaceService', MarketplaceServiceImplemented)
  .register<GetAllIngredientsUseCase>('GetAllIngredientsUseCase', GetAllIngredientsUseCase)
  .register<GetAllIngredientsController>('GetAllIngredientsController', GetAllIngredientsController)
  .register<OrderIngredientStockUseCase>('OrderIngredientStockUseCase', OrderIngredientStockUseCase)
  .register<OrderIngredientStockController>('OrderIngredientStockController', OrderIngredientStockController)
  .register<GetIngredientUseCase>('GetIngredientUseCase', GetIngredientUseCase)
  .register<GetIngredientController>('GetIngredientController', GetIngredientController);

export { container };
