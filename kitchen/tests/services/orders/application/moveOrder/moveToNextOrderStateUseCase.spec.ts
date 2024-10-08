/* eslint-disable max-lines-per-function */
import { MoveToNextOrderStateRequest } from '@services/orders/application/useCases/moveState/moveToNextOrderStateRequest';
import { MoveToNextOrderStateUseCase } from '@services/orders/application/useCases/moveState/moveToNextOrderStateUseCase';
import { OrderCreatedEvent } from '@services/orders/domain/events/orderCreatedEvent';
import { OrderStateUpdatedEvent } from '@services/orders/domain/events/orderStateUpdatedEvent';
import { Order } from '@services/orders/domain/order';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { EventBus } from '@shared/domain/events/eventBus';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { anyOfClass, anything, deepEqual, instance, mock, reset, verify, when } from 'ts-mockito';

jest.setTimeout(300000);

describe('Tests MoveToNextOrderStateUseCase', () => {
  const orderRepositoryMock = mock<OrderRepository>();
  const eventBusMock = mock<EventBus>();
  const eventBusQueueMock = mock<EventBus>();

  afterEach(() => {
    reset(orderRepositoryMock);
    reset(eventBusMock);
    reset(eventBusQueueMock);

    jest.clearAllMocks();
  });

  test('MoveToNextOrderStateUseCase: order state changed successly', async () => {
    const orderId = OrderId.newId();
    const request: MoveToNextOrderStateRequest = {
      orderId: orderId.value,
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
    const eventBus = instance(eventBusMock);
    const eventBusQueue = instance(eventBusQueueMock);
    const useCase = new MoveToNextOrderStateUseCase(orderRepository, eventBus, eventBusQueue);

    const result = await useCase.run(request);

    verify(orderRepositoryMock.find(deepEqual(orderId))).once();
    verify(orderRepositoryMock.update(deepEqual(order))).once();
    // @ts-expect-error private constructor
    verify(eventBusMock.publish(deepEqual([anyOfClass(OrderStateUpdatedEvent)]))).once();
    verify(eventBusQueueMock.publish(anything())).never();
    expect(result).toEqual({
      orderId: orderId.value,
      recipeId: '9d50a1ac-5712-48cd-9e3e-b915ce16b248',
      state: 'done',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('MoveToNextOrderStateUseCase: order sent to prepare successly', async () => {
    const orderId = OrderId.newId();
    const request: MoveToNextOrderStateRequest = {
      orderId: orderId.value,
    };

    const order = Order.fromPrimitives({
      orderId: orderId.value,
      recipeId: '9d50a1ac-5712-48cd-9e3e-b915ce16b248',
      state: 'todo',
      createdAt: '2024-01-20T00:00:00.000Z',
      updatedAt: '2024-01-20T00:00:00.000Z',
    });

    when(orderRepositoryMock.find(deepEqual(orderId))).thenResolve(order);

    const orderRepository = instance(orderRepositoryMock);
    const eventBus = instance(eventBusMock);
    const eventBusQueue = instance(eventBusQueueMock);
    const useCase = new MoveToNextOrderStateUseCase(orderRepository, eventBus, eventBusQueue);

    const result = await useCase.run(request);

    verify(orderRepositoryMock.find(deepEqual(orderId))).once();
    verify(orderRepositoryMock.update(deepEqual(order))).never();
    verify(eventBusMock.publish(anything())).never();
    // @ts-expect-error private constructor
    verify(eventBusQueueMock.publish(deepEqual([anyOfClass(OrderCreatedEvent)]))).once();
    expect(result).toEqual({
      orderId: orderId.value,
      recipeId: '9d50a1ac-5712-48cd-9e3e-b915ce16b248',
      state: 'todo',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('MoveToNextOrderStateUseCase: order not found', async () => {
    const orderId = OrderId.newId();
    const request: MoveToNextOrderStateRequest = {
      orderId: orderId.value,
    };

    const orderRepository = instance(orderRepositoryMock);
    const eventBus = instance(eventBusMock);
    const eventBusQueue = instance(eventBusQueueMock);
    const useCase = new MoveToNextOrderStateUseCase(orderRepository, eventBus, eventBusQueue);

    await expect(useCase.run(request)).rejects.toThrow('Order not found');

    verify(orderRepositoryMock.find(deepEqual(orderId))).once();
    verify(orderRepositoryMock.update(anything())).never();
    verify(eventBusMock.publish(anything())).never();
    verify(eventBusQueueMock.publish(anything())).never();
  });
});
