import { container } from '@di/shared';
import { CreateOrderUseCase } from '@services/orders/application/useCases/create/createOrderUseCase';
import { GetAllOrdersUseCase } from '@services/orders/application/useCases/getAll/getAllOrdersUseCase';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { CreateOrderController } from '@services/orders/infrastructure/functions/http/create/controller';
import { GetAllOrdersController } from '@services/orders/infrastructure/functions/http/getAll/controller';
import { MongoOrderRepository } from '@services/orders/infrastructure/persistence/mongodb/mongoOrderRepository';
import { RecipeRepository } from '@services/recipes/domain/repositories/recipeRepository';
import { MongoRecipeRepository } from '@services/recipes/infrastructure/persistence/mongodb/mongoRecipeRepository';

container
  .register<OrderRepository>('OrderRepository', MongoOrderRepository)
  .register<RecipeRepository>('RecipeRepository', MongoRecipeRepository)
  .register<CreateOrderUseCase>('CreateOrderUseCase', CreateOrderUseCase)
  .register<CreateOrderController>('CreateOrderController', CreateOrderController)
  .register<GetAllOrdersUseCase>('GetAllOrdersUseCase', GetAllOrdersUseCase)
  .register<GetAllOrdersController>('GetAllOrdersController', GetAllOrdersController);

export { container };
