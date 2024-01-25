import { container } from '@di/shared';
import { CreateOrderHistoryUseCase } from '@services/ordersHistory/application/useCases/create/createOrderHistoryUseCase';
import { OrderHistoryRepository } from '@services/ordersHistory/domain/repositories/orderHistoryRepository';
import { CreateOrderHistoryController } from '@services/ordersHistory/infrastructure/functions/sns/create/controller';
import { MongoOrderHistoryRepository } from '@services/ordersHistory/infrastructure/persistence/mongodb/mongoOrderHistoryRepository';

container
  .register<OrderHistoryRepository>('OrderHistoryRepository', MongoOrderHistoryRepository)
  .register<CreateOrderHistoryUseCase>('CreateOrderHistoryUseCase', CreateOrderHistoryUseCase)
  .register<CreateOrderHistoryController>('CreateOrderHistoryController', CreateOrderHistoryController);

export { container };
