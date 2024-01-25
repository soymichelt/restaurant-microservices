import { OrderHistory } from '@services/ordersHistory/domain/orderHistory';
import { OrderHistoryId } from '@services/ordersHistory/domain/valueObjects/orderHistoryId';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { OrderState } from '@shared/domain/valueObjects/orderState';

describe('Tests OrderHistory aggregate root', () => {
  test('Build OrderHistory instance object', () => {
    const orderHistory = OrderHistory.build({
      orderHistoryId: OrderHistoryId.build('05f2badb-0fb8-4ed4-a195-76c46c4a827f'),
      orderId: OrderId.build('5fa46367-8584-41fa-b85d-0fe4b59ddd47'),
      state: OrderState.inProgress(),
      prevState: OrderState.todo(),
    });

    const result = orderHistory.toPrimitives();

    expect(result).toEqual({
      orderHistoryId: '05f2badb-0fb8-4ed4-a195-76c46c4a827f',
      orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      state: 'inProgress',
      prevState: 'todo',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('Build OrderHistory from primitives values', () => {
    const orderHistory = OrderHistory.fromPrimitives({
      orderHistoryId: '05f2badb-0fb8-4ed4-a195-76c46c4a827f',
      orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      state: 'inProgress',
      prevState: 'todo',
      createdAt: '2024-01-20T00:00:00.000Z',
      updatedAt: '2024-01-20T00:00:00.000Z',
    });

    const result = orderHistory.toPrimitives();

    expect(result).toEqual({
      orderHistoryId: '05f2badb-0fb8-4ed4-a195-76c46c4a827f',
      orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      state: 'inProgress',
      prevState: 'todo',
      createdAt: '2024-01-20T00:00:00.000Z',
      updatedAt: '2024-01-20T00:00:00.000Z',
    });
  });
});
