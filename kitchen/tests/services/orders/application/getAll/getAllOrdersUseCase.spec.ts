/* eslint-disable max-lines-per-function */
import { GetAllOrdersUseCase } from '@services/orders/application/useCases/getAll/getAllOrdersUseCase';
import { Order } from '@services/orders/domain/order';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { Recipe } from '@services/recipes/domain/recipe';
import { RecipeRepository } from '@services/recipes/domain/repositories/recipeRepository';
import { RecipeId } from '@shared/domain/valueObjects/recipeId';
import { anything, instance, mock, reset, verify, when } from 'ts-mockito';

describe('Tests GetAllOrdersUseCase', () => {
  const recipeRepositoryMock = mock<RecipeRepository>();
  const orderRepositoryMock = mock<OrderRepository>();
  const order1Mock = mock<Order>();
  const order2Mock = mock<Order>();
  const recipe1Mock = mock<Recipe>();
  const recipe2Mock = mock<Recipe>();

  afterEach(() => {
    reset(recipeRepositoryMock);
    reset(orderRepositoryMock);
    reset(order1Mock);
    reset(order2Mock);
    reset(recipe1Mock);
    reset(recipe2Mock);
    jest.clearAllMocks();
  });

  test('GetAllOrdersUseCase: success', async () => {
    when(order1Mock.recipeId).thenReturn(RecipeId.build('09236849-30a3-4229-a718-c464415f67a6'));
    when(order1Mock.toPrimitives()).thenReturn({
      orderId: '5a3c8ea3-ce02-46c6-a8ff-1d61c90a5045',
      recipeId: '09236849-30a3-4229-a718-c464415f67a6',
      state: 'todo',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
    });
    when(order2Mock.recipeId).thenReturn(RecipeId.build('f8181974-a6de-4207-8ed0-c2e8717229a1'));
    when(order2Mock.toPrimitives()).thenReturn({
      orderId: 'b7415222-d1e6-4f0f-80ac-d4c9c2ed015c',
      recipeId: 'f8181974-a6de-4207-8ed0-c2e8717229a1',
      state: 'todo',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
    });
    const order1 = instance(order1Mock);
    const order2 = instance(order2Mock);
    when(orderRepositoryMock.all()).thenResolve([order1, order2]);

    when(recipe1Mock.recipeId).thenReturn(RecipeId.build('09236849-30a3-4229-a718-c464415f67a6'));
    when(recipe1Mock.toPrimitives()).thenReturn({
      recipeId: '09236849-30a3-4229-a718-c464415f67a6',
      name: 'Receta 1',
      description: 'Receta 1',
      preparationMethod: 'Pasos para preparar esta receta',
      ingredients: [],
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
    });
    when(recipe2Mock.recipeId).thenReturn(RecipeId.build('f8181974-a6de-4207-8ed0-c2e8717229a1'));
    when(recipe2Mock.toPrimitives()).thenReturn({
      recipeId: 'f8181974-a6de-4207-8ed0-c2e8717229a1',
      name: 'Receta 2',
      description: 'Receta 2',
      preparationMethod: 'Pasos para preparar esta receta',
      ingredients: [],
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
    });
    const recipe1 = instance(recipe1Mock);
    const recipe2 = instance(recipe2Mock);
    when(recipeRepositoryMock.all(anything())).thenResolve([recipe1, recipe2]);

    const recipeRepository = instance(recipeRepositoryMock);
    const orderRepository = instance(orderRepositoryMock);

    const useCase = new GetAllOrdersUseCase(orderRepository, recipeRepository);
    const result = await useCase.run();

    verify(orderRepositoryMock.all()).once();
    verify(recipeRepositoryMock.all(anything())).once();
    expect(result).toEqual([
      {
        orderId: '5a3c8ea3-ce02-46c6-a8ff-1d61c90a5045',
        recipeId: '09236849-30a3-4229-a718-c464415f67a6',
        recipeName: 'Receta 1',
        recipeDescription: 'Receta 1',
        recipePreparationMethod: 'Pasos para preparar esta receta',
        state: 'todo',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20',
      },
      {
        orderId: 'b7415222-d1e6-4f0f-80ac-d4c9c2ed015c',
        recipeId: 'f8181974-a6de-4207-8ed0-c2e8717229a1',
        recipeName: 'Receta 2',
        recipeDescription: 'Receta 2',
        recipePreparationMethod: 'Pasos para preparar esta receta',
        state: 'todo',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20',
      },
    ]);
  });
});
