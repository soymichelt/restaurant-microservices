import { CreateOrderHistoryRequest } from '@services/ordersHistory/application/useCases/create/createOrderHistoryRequest';
import { CreateOrderHistoryUseCase } from '@services/ordersHistory/application/useCases/create/createOrderHistoryUseCase';
import { OrderHistory } from '@services/ordersHistory/domain/orderHistory';
import { OrderHistoryRepository } from '@services/ordersHistory/domain/repositories/orderHistoryRepository';
import { anyOfClass, capture, instance, mock, reset, verify } from 'ts-mockito';

jest.setTimeout(300000);

describe('Tests CreateOrderHistoryUseCase', () => {
  const orderHistoryRepositoryMock = mock<OrderHistoryRepository>();

  afterEach(() => {
    reset(orderHistoryRepositoryMock);
    jest.clearAllMocks();
  });

  test('CreateOrderHistoryUseCase: order history created successly', async () => {
    const request: CreateOrderHistoryRequest = {
      orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      state: 'todo',
      prevState: 'inProgress',
    };

    const orderHistoryRepository = instance(orderHistoryRepositoryMock);

    const useCase = new CreateOrderHistoryUseCase(orderHistoryRepository);
    await useCase.run(request);

    // @ts-expect-error private constructor
    verify(orderHistoryRepositoryMock.update(anyOfClass(OrderHistory))).once();
    const [orderHistory] = capture(orderHistoryRepositoryMock.update).first();
    const result = orderHistory.toPrimitives();
    expect(result).toEqual({
      orderHistoryId: expect.any(String),
      orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      state: 'todo',
      prevState: 'inProgress',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
