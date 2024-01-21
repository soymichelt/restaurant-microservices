import { CreateOrderUseCase } from '@services/orders/application/useCases/create/createOrderUseCase';
import { OrderCreatedEvent } from '@services/orders/domain/events/orderCreatedEvent';
import { Order } from '@services/orders/domain/order';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { Recipe } from '@services/recipes/domain/recipe';
import { RecipeRepository } from '@services/recipes/domain/repositories/recipeRepository';
import { EventBus } from '@shared/domain/events/eventBus';
import { RecipeId } from '@shared/domain/valueObjects/recipeId';
import { anyOfClass, anything, deepEqual, instance, mock, reset, verify, when } from 'ts-mockito';

jest.setTimeout(300000);

describe('Tests CreateOrderUseCase', () => {
  const recipeRepositoryMock = mock<RecipeRepository>();
  const orderRepositoryMock = mock<OrderRepository>();
  const eventBusMock = mock<EventBus>();

  afterEach(() => {
    reset(recipeRepositoryMock);
    reset(orderRepositoryMock);
    reset(eventBusMock);
    jest.clearAllMocks();
  });

  test('CreateOrderUseCase: order created success', async () => {
    when(recipeRepositoryMock.findRand()).thenResolve({
      recipeId: { value: '1' } as RecipeId,
      toPrimitives: () => ({
        recipeId: '1',
        name: 'Receta 1',
        description: 'Receta 1',
        preparationMethod: 'Pasos para preparar esta receta',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20',
      }),
    } as Recipe);

    const recipeRepository = instance(recipeRepositoryMock);
    const orderRepository = instance(orderRepositoryMock);
    const eventBus = instance(eventBusMock);

    const useCase = new CreateOrderUseCase(orderRepository, recipeRepository, eventBus);
    const result = await useCase.run();

    verify(recipeRepositoryMock.findRand()).once();
    // @ts-expect-error private constructor
    verify(orderRepositoryMock.update(anyOfClass(Order))).once();
    // @ts-expect-error private constructor
    verify(eventBusMock.publish(deepEqual([anyOfClass(OrderCreatedEvent)]))).once();
    expect(result).toEqual({
      orderId: expect.any(String),
      recipeId: '1',
      state: 'todo',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('CreateOrderUseCase: recipe not found', async () => {
    const recipeRepository = instance(recipeRepositoryMock);
    const orderRepository = instance(orderRepositoryMock);
    const eventBus = instance(eventBusMock);

    const useCase = new CreateOrderUseCase(orderRepository, recipeRepository, eventBus);
    await expect(useCase.run()).rejects.toThrow('Recipe not found');
    verify(recipeRepositoryMock.findRand()).once();
    verify(orderRepositoryMock.update(anything())).never();
    verify(eventBusMock.publish(anything())).never();
  });
});
