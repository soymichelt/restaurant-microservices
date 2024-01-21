import { Order } from '@services/orders/domain/order';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { MongoRepository } from '@shared/infrastructure/persistence/mongodb/mongoRepository';
import { injectable } from 'tsyringe';

const ORDER_COLLECTION = 'orders';

@injectable()
export class MongoOrderRepository extends MongoRepository<Order> implements OrderRepository {
  constructor() {
    super({ collectionName: ORDER_COLLECTION });
  }

  public async update(order: Order): Promise<void> {
    await this.persist(order.orderId, order);
  }
}
