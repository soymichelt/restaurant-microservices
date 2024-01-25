/* eslint-disable max-lines-per-function */
import { Order } from '@services/orders/domain/order';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { OrderState } from '@shared/domain/valueObjects/orderState';
import { RecipeId } from '@shared/domain/valueObjects/recipeId';

describe('Tests Order aggregate root', () => {
  test('Build order instance object', () => {
    const order = Order.build({
      orderId: OrderId.build('5fa46367-8584-41fa-b85d-0fe4b59ddd47'),
      recipeId: RecipeId.build('4d646367-8584-41fa-b85d-0fe4b59ddd47'),
      state: OrderState.todo(),
    });

    const result = order.toPrimitives();

    expect(result).toEqual({
      orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      recipeId: '4d646367-8584-41fa-b85d-0fe4b59ddd47',
      state: 'todo',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('Create order instance object', () => {
    const order = Order.create({
      orderId: OrderId.build('5fa46367-8584-41fa-b85d-0fe4b59ddd47'),
      recipeId: RecipeId.build('4d646367-8584-41fa-b85d-0fe4b59ddd47'),
      state: OrderState.todo(),
    });

    const result = order.toPrimitives();
    const events = order.pullEvents();

    expect(result).toEqual({
      orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      recipeId: '4d646367-8584-41fa-b85d-0fe4b59ddd47',
      state: 'todo',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(events.length).toBe(1);
    expect(events.map((event) => event.toPrimitives())).toEqual([
      {
        aggregateId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
        eventId: expect.any(String),
        eventDate: expect.any(String),
        eventType: 'order.created',
        orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
        recipeId: '4d646367-8584-41fa-b85d-0fe4b59ddd47',
        state: 'todo',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });

  test('Build order from primitives values', () => {
    const order = Order.fromPrimitives({
      orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      recipeId: '4d646367-8584-41fa-b85d-0fe4b59ddd47',
      state: 'todo',

      createdAt: '2024-01-20T00:00:00.000Z',
      updatedAt: '2024-01-20T00:00:00.000Z',
    });

    const result = order.toPrimitives();

    expect(result).toEqual({
      orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      recipeId: '4d646367-8584-41fa-b85d-0fe4b59ddd47',
      state: 'todo',

      createdAt: '2024-01-20T00:00:00.000Z',
      updatedAt: '2024-01-20T00:00:00.000Z',
    });
  });

  describe('Tests order steps', () => {
    test('Test markAsInProgress method', () => {
      const order = Order.build({
        orderId: OrderId.build('5fa46367-8584-41fa-b85d-0fe4b59ddd47'),
        recipeId: RecipeId.build('4d646367-8584-41fa-b85d-0fe4b59ddd47'),
        state: OrderState.todo(),
      });

      order.markAsInProgress();

      const result = order.toPrimitives();

      expect(result).toEqual({
        orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
        recipeId: '4d646367-8584-41fa-b85d-0fe4b59ddd47',
        state: 'inProgress',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    test('Test markAsNextState method: move state from "inProgress" to "done"', () => {
      const order = Order.build({
        orderId: OrderId.build('5fa46367-8584-41fa-b85d-0fe4b59ddd47'),
        recipeId: RecipeId.build('4d646367-8584-41fa-b85d-0fe4b59ddd47'),
        state: OrderState.inProgress(),
      });

      order.markAsNextState();

      const result = order.toPrimitives();

      expect(result).toEqual({
        orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
        recipeId: '4d646367-8584-41fa-b85d-0fe4b59ddd47',
        state: 'done',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    test('Test markAsNextState method: move state from "done" to "delivered"', () => {
      const order = Order.build({
        orderId: OrderId.build('5fa46367-8584-41fa-b85d-0fe4b59ddd47'),
        recipeId: RecipeId.build('4d646367-8584-41fa-b85d-0fe4b59ddd47'),
        state: OrderState.done(),
      });

      order.markAsNextState();

      const result = order.toPrimitives();

      expect(result).toEqual({
        orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
        recipeId: '4d646367-8584-41fa-b85d-0fe4b59ddd47',
        state: 'delivered',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    test('Test markAsNextState method, when current state is "delivered"', () => {
      const order = Order.build({
        orderId: OrderId.build('5fa46367-8584-41fa-b85d-0fe4b59ddd47'),
        recipeId: RecipeId.build('4d646367-8584-41fa-b85d-0fe4b59ddd47'),
        state: OrderState.delivered(),
      });

      expect(() => order.markAsNextState()).toThrow('');

      const result = order.toPrimitives();

      expect(result).toEqual({
        orderId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
        recipeId: '4d646367-8584-41fa-b85d-0fe4b59ddd47',
        state: 'delivered',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});
