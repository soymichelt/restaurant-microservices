import { GetAllIngredientsUseCase } from '@services/ingredients/application/useCases/getAll/getAllIngredientsUseCase';
import { Ingredient } from '@services/ingredients/domain/ingredient';
import { IngredientRepository } from '@services/ingredients/domain/repositories/ingredientRepository';
import { instance, mock, reset, verify, when } from 'ts-mockito';

describe('Tests GetAllIngredientsUseCase', () => {
  const ingredientRepositoryMock = mock<IngredientRepository>();
  const ingredientMock = mock<Ingredient>();

  afterEach(() => {
    reset(ingredientRepositoryMock);
    reset(ingredientMock);
  });

  test('GetAllIngredientsUseCase: success', async () => {
    when(ingredientMock.toPrimitives()).thenReturn({
      ingredientId: '247e9a7d-a5c8-4fdc-a2a3-3c923b5ece0d',
      name: 'Meat',
      stock: 100,
      createdAt: '2024-01-22T03:50:20.614Z',
      updatedAt: '2024-01-22T03:50:20.614Z',
    });
    const ingredient = instance(ingredientMock);
    when(ingredientRepositoryMock.all()).thenResolve([ingredient]);
    const ingredientRepository = instance(ingredientRepositoryMock);

    const useCase = new GetAllIngredientsUseCase(ingredientRepository);
    const result = await useCase.run();

    verify(ingredientRepositoryMock.all()).once();
    expect(result).toEqual([
      {
        ingredientId: '247e9a7d-a5c8-4fdc-a2a3-3c923b5ece0d',
        name: 'Meat',
        stock: 100,
        createdAt: '2024-01-22T03:50:20.614Z',
        updatedAt: '2024-01-22T03:50:20.614Z',
      },
    ]);
  });
});
