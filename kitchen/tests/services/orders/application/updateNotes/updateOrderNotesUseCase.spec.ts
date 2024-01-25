/* eslint-disable max-lines-per-function */
import { UpdateOrderNotesRequest } from '@services/orders/application/useCases/updateNotes/updateOrderNotesRequest';
import { UpdateOrderNotesUseCase } from '@services/orders/application/useCases/updateNotes/updateOrderNotesUseCase';
import { Order } from '@services/orders/domain/order';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { OrderId } from '@services/orders/domain/valueObjects/orderId';
import { anything, deepEqual, instance, mock, reset, verify, when } from 'ts-mockito';

jest.setTimeout(300000);

describe('Tests UpdateOrderNotesUseCase', () => {
  const orderRepositoryMock = mock<OrderRepository>();

  afterEach(() => {
    reset(orderRepositoryMock);
    jest.clearAllMocks();
  });

  test('UpdateOrderNotesUseCase: order notes updated successly', async () => {
    const orderId = OrderId.newId();
    const request: UpdateOrderNotesRequest = {
      orderId: orderId.value,
      notes: 'prueba de notas',
    };

    const order = Order.fromPrimitives({
      orderId: orderId.value,
      recipeId: '9d50a1ac-5712-48cd-9e3e-b915ce16b248',
      state: 'inProgress',
      createdAt: '2024-01-20T00:00:00.000Z',
      updatedAt: '2024-01-20T00:00:00.000Z',
    });

    when(orderRepositoryMock.find(deepEqual(orderId))).thenResolve(order);

    const orderRepository = instance(orderRepositoryMock);
    const useCase = new UpdateOrderNotesUseCase(orderRepository);

    const result = await useCase.run(request);

    verify(orderRepositoryMock.find(deepEqual(orderId))).once();
    verify(orderRepositoryMock.update(deepEqual(order))).once();
    expect(result).toEqual({
      orderId: orderId.value,
      recipeId: '9d50a1ac-5712-48cd-9e3e-b915ce16b248',
      state: 'inProgress',
      notes: 'prueba de notas',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('UpdateOrderNotesUseCase: order notes updated successly', async () => {
    const orderId = OrderId.newId();
    const request: UpdateOrderNotesRequest = {
      orderId: orderId.value,
      notes: 'prueba de notas',
    };

    const orderRepository = instance(orderRepositoryMock);
    const useCase = new UpdateOrderNotesUseCase(orderRepository);

    await expect(useCase.run(request)).rejects.toThrow('Order not found');

    verify(orderRepositoryMock.find(deepEqual(orderId))).once();
    verify(orderRepositoryMock.update(anything())).never();
  });
});
