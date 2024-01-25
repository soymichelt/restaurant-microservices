import { OrderHistory } from '@services/ordersHistory/domain/orderHistory';
import { OrderHistoryRepository } from '@services/ordersHistory/domain/repositories/orderHistoryRepository';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { MongoRepository } from '@shared/infrastructure/persistence/mongodb/mongoRepository';
import { injectable } from 'tsyringe';

const ORDER_HISTORY_COLLECTION = 'ordersHistory';

@injectable()
export class MongoOrderHistoryRepository extends MongoRepository<OrderHistory> implements OrderHistoryRepository {
  constructor() {
    super({ collectionName: ORDER_HISTORY_COLLECTION });
  }

  public async all(orderId: OrderId): Promise<OrderHistory[]> {
    const collection = await this.collection();
    const documents = await collection.find({ _id: orderId.value }).toArray();
    if (!documents?.length) return;

    return documents.map((document) => this.mapToOrderHistory(document));
  }

  public async update(orderHistory: OrderHistory): Promise<void> {
    await this.persist(orderHistory.orderId, orderHistory);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToOrderHistory(document: any): OrderHistory {
    return OrderHistory.fromPrimitives({
      orderId: document.orderId,
      state: document.state,
      prevState: document.prevState,

      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
