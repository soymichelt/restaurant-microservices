import { container } from '@di/shared';
import { CheckOrdersUseCase } from '@services/orders/application/useCases/checkOrders/checkOrdersUseCase';
import { CreateOrderUseCase } from '@services/orders/application/useCases/create/createOrderUseCase';
import { GetAllOrdersUseCase } from '@services/orders/application/useCases/getAll/getAllOrdersUseCase';
import { MoveToNextOrderStateUseCase } from '@services/orders/application/useCases/moveState/moveToNextOrderStateUseCase';
import { PrepareOrderUseCase } from '@services/orders/application/useCases/prepare/prepareOrderUseCase';
import { UpdateOrderNotesUseCase } from '@services/orders/application/useCases/updateNotes/updateOrderNotesUseCase';
import { UpdateOrderStateUseCase } from '@services/orders/application/useCases/updateState/updateOrderStateUseCase';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { OrderIngredientsService } from '@services/orders/domain/services/orderIngredientsService';
import { CheckOrdersController } from '@services/orders/infrastructure/functions/cronjobs/checkOrders/controller';
import { CreateOrderController } from '@services/orders/infrastructure/functions/http/create/controller';
import { GetAllOrdersController } from '@services/orders/infrastructure/functions/http/getAll/controller';
import { MoveToNextOrderStateController } from '@services/orders/infrastructure/functions/http/moveState/controller';
import { UpdateOrderNotesController } from '@services/orders/infrastructure/functions/http/updateNotes/controller';
import { UpdateOrderStateController } from '@services/orders/infrastructure/functions/http/updateState/controller';
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
  .register<MoveToNextOrderStateUseCase>('MoveToNextOrderStateUseCase', MoveToNextOrderStateUseCase)
  .register<MoveToNextOrderStateController>('MoveToNextOrderStateController', MoveToNextOrderStateController)
  .register<UpdateOrderStateUseCase>('UpdateOrderStateUseCase', UpdateOrderStateUseCase)
  .register<UpdateOrderStateController>('UpdateOrderStateController', UpdateOrderStateController)
  .register<UpdateOrderNotesUseCase>('UpdateOrderNotesUseCase', UpdateOrderNotesUseCase)
  .register<UpdateOrderNotesController>('UpdateOrderNotesController', UpdateOrderNotesController)
  .register<CheckOrdersUseCase>('CheckOrdersUseCase', CheckOrdersUseCase)
  .register<CheckOrdersController>('CheckOrdersController', CheckOrdersController);

export { container };
