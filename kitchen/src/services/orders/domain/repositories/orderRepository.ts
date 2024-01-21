import { Order } from '@services/orders/domain/order';
import { OrderId } from '@services/orders/domain/valueObjects/orderId';

export interface OrderRepository {
  all(orderIds?: OrderId[]): Promise<Order[]>;
  update(order: Order): Promise<void>;
}
