import { OrderHistory } from '@services/ordersHistory/domain/orderHistory';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { OrderState } from '@shared/domain/valueObjects/orderState';

describe('Tests OrderHistory aggregate root', () => {
  test('Build OrderHistory instance object', () => {
    const orderHistory = OrderHistory.build({
      orderId: OrderId.build('5fa46367-8584-41fa-b85d-0fe4b59ddd47'),
      state: OrderState.inProgress(),
      prevState: OrderState.todo(),
    });

    const result = orderHistory.toPrimitives();

    expect(result).toEqual({
      orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      state: 'inProgress',
      prevState: 'todo',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('Build OrderHistory from primitives values', () => {
    const orderHistory = OrderHistory.fromPrimitives({
      orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      state: 'inProgress',
      prevState: 'todo',
      createdAt: '2024-01-20T00:00:00.000Z',
      updatedAt: '2024-01-20T00:00:00.000Z',
    });

    const result = orderHistory.toPrimitives();

    expect(result).toEqual({
      orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      state: 'inProgress',
      prevState: 'todo',
      createdAt: '2024-01-20T00:00:00.000Z',
      updatedAt: '2024-01-20T00:00:00.000Z',
    });
  });
});
