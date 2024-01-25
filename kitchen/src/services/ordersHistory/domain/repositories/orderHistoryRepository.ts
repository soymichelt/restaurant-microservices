import { OrderHistory } from '@services/ordersHistory/domain/orderHistory';
import { OrderId } from '@shared/domain/valueObjects/orderId';

export interface OrderHistoryRepository {
  all(orderId: OrderId): Promise<OrderHistory[]>;
  update(orderHistory: OrderHistory): Promise<void>;
}
