import { Order } from '@services/orders/domain/order';
import { DateRange } from '@shared/domain/valueObjects/dateRangeValueObject';
import { OrderId } from '@shared/domain/valueObjects/orderId';

export interface OrderRepository {
  all(orderIds?: OrderId[], range?: DateRange): Promise<Order[]>;
  find(orderId: OrderId): Promise<Order>;
  update(order: Order): Promise<void>;
}
