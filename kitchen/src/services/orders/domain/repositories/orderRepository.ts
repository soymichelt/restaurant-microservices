import { Order } from '@services/orders/domain/order';

export interface OrderRepository {
  update(order: Order): Promise<void>;
}
