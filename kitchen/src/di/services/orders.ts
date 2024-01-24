import { container } from '@di/shared';
import { CreateOrderUseCase } from '@services/orders/application/useCases/create/createOrderUseCase';
import { DoneOrderUseCase } from '@services/orders/application/useCases/done/doneOrderUseCase';
import { GetAllOrdersUseCase } from '@services/orders/application/useCases/getAll/getAllOrdersUseCase';
import { PrepareOrderUseCase } from '@services/orders/application/useCases/prepare/prepareOrderUseCase';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { OrderIngredientsService } from '@services/orders/domain/services/orderIngredientsService';
import { CreateOrderController } from '@services/orders/infrastructure/functions/http/create/controller';
import { DoneOrderController } from '@services/orders/infrastructure/functions/http/done/controller';
import { GetAllOrdersController } from '@services/orders/infrastructure/functions/http/getAll/controller';
import { PrepareOrderController } from '@services/orders/infrastructure/functions/sqs/prepare/controller';
import { MongoOrderRepository } from '@services/orders/infrastructure/persistence/mongodb/mongoOrderRepository';
import { OrderIngredientsServiceImplemented } from '@services/orders/infrastructure/services/orderIngredientsService';
import { RecipeRepository } from '@services/recipes/domain/repositories/recipeRepository';
import { MongoRecipeRepository } from '@services/recipes/infrastructure/persistence/mongodb/mongoRecipeRepository';

container
  .register<OrderRepository>('OrderRepository', MongoOrderRepository)
  .register<OrderIngredientsService>('OrderIngredientsService', OrderIngredientsServiceImplemented)
  .register<RecipeRepository>('RecipeRepository', MongoRecipeRepository)
  .register<CreateOrderUseCase>('CreateOrderUseCase', CreateOrderUseCase)
  .register<CreateOrderController>('CreateOrderController', CreateOrderController)
  .register<GetAllOrdersUseCase>('GetAllOrdersUseCase', GetAllOrdersUseCase)
  .register<GetAllOrdersController>('GetAllOrdersController', GetAllOrdersController)
  .register<PrepareOrderUseCase>('PrepareOrderUseCase', PrepareOrderUseCase)
  .register<PrepareOrderController>('PrepareOrderController', PrepareOrderController)
  .register<DoneOrderUseCase>('DoneOrderUseCase', DoneOrderUseCase)
  .register<DoneOrderController>('DoneOrderController', DoneOrderController);

export { container };
