/* eslint-disable security/detect-non-literal-regexp */
import { Order } from '@services/orders/domain/order';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { DateRange } from '@shared/domain/valueObjects/dateRangeValueObject';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { MongoRepository } from '@shared/infrastructure/persistence/mongodb/mongoRepository';
import { injectable } from 'tsyringe';

const ORDER_COLLECTION = 'orders';

@injectable()
export class MongoOrderRepository extends MongoRepository<Order> implements OrderRepository {
  constructor() {
    super({ collectionName: ORDER_COLLECTION });
  }

  public async all(orderIds?: OrderId[], range?: DateRange): Promise<Order[]> {
    const collection = await this.collection();
    const andFilters = [];

    if (orderIds) {
      andFilters.push({ _id: { $in: orderIds.map((orderId) => orderId.value) } });
    }
    if (range?.isToday()) {
      andFilters.push({ createdAt: { $regex: DateRange.getTodayRegex() } });
    }
    if (range?.isMonth()) {
      andFilters.push({ createdAt: { $regex: DateRange.getMonthRegex() } });
    }

    const documents = await collection.find(andFilters.length ? { $and: andFilters } : {}).toArray();
    if (!documents || !documents.length) return [];

    return documents.map((document) => this.mapToOrder(document));
  }

  public async find(orderId: OrderId): Promise<Order> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: orderId.value });
    if (!document) return;

    return this.mapToOrder(document);
  }

  public async update(order: Order): Promise<void> {
    await this.persist(order.orderId, order);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToOrder(document: any): Order {
    return Order.fromPrimitives({
      orderId: document.orderId,
      recipeId: document.recipeId,
      state: document.state,
      notes: document.notes,

      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
