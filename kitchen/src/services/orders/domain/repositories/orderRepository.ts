import { Order } from '@services/orders/domain/order';
import { OrderId } from '@shared/domain/valueObjects/orderId';

export interface OrderRepository {
  all(orderIds?: OrderId[]): Promise<Order[]>;
  find(orderId: OrderId): Promise<Order>;
  update(order: Order): Promise<void>;
}
