/* eslint-disable max-lines-per-function */
import { GetAllRecipesUseCase } from '@services/recipes/application/useCases/getAll/getAllRecipesUseCase';
import { Recipe } from '@services/recipes/domain/recipe';
import { RecipeRepository } from '@services/recipes/domain/repositories/recipeRepository';
import { instance, mock, reset, when } from 'ts-mockito';

describe('Tests GetAllRecipesUseCase', () => {
  const repositoryMock = mock<RecipeRepository>();
  const recipe1Mock = mock<Recipe>();
  const recipe2Mock = mock<Recipe>();
  const recipe3Mock = mock<Recipe>();
  const recipe4Mock = mock<Recipe>();
  const recipe5Mock = mock<Recipe>();
  const recipe6Mock = mock<Recipe>();

  afterEach(() => {
    reset(repositoryMock);
    reset(recipe1Mock);
    reset(recipe2Mock);
    reset(recipe3Mock);
    reset(recipe4Mock);
    reset(recipe5Mock);
    reset(recipe6Mock);
    jest.clearAllMocks();
  });

  test('Success GetAllRecipesUseCase', async () => {
    when(recipe1Mock.toPrimitives()).thenReturn({
      recipeId: '1',
      name: 'Receta 1',
      description: 'Receta 1',
      preparationMethod: 'Pasos para preparar esta receta',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
    });
    when(recipe2Mock.toPrimitives()).thenReturn({
      recipeId: '2',
      name: 'Receta 2',
      description: 'Receta 2',
      preparationMethod: 'Pasos para preparar esta receta',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
    });
    when(recipe3Mock.toPrimitives()).thenReturn({
      recipeId: '3',
      name: 'Receta 3',
      description: 'Receta 3',
      preparationMethod: 'Pasos para preparar esta receta',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
    });
    when(recipe4Mock.toPrimitives()).thenReturn({
      recipeId: '4',
      name: 'Receta 4',
      description: 'Receta 4',
      preparationMethod: 'Pasos para preparar esta receta',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
    });
    when(recipe5Mock.toPrimitives()).thenReturn({
      recipeId: '5',
      name: 'Receta 5',
      description: 'Receta 5',
      preparationMethod: 'Pasos para preparar esta receta',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
    });
    when(recipe6Mock.toPrimitives()).thenReturn({
      recipeId: '6',
      name: 'Receta 6',
      description: 'Receta 6',
      preparationMethod: 'Pasos para preparar esta receta',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
    });

    const recipe1 = instance(recipe1Mock);
    const recipe2 = instance(recipe2Mock);
    const recipe3 = instance(recipe3Mock);
    const recipe4 = instance(recipe4Mock);
    const recipe5 = instance(recipe5Mock);
    const recipe6 = instance(recipe6Mock);

    when(repositoryMock.all()).thenResolve([recipe1, recipe2, recipe3, recipe4, recipe5, recipe6]);
    const repository = instance(repositoryMock);

    const useCase = new GetAllRecipesUseCase(repository);
    const result = await useCase.run();

    expect(result).toEqual([
      {
        recipeId: '1',
        name: 'Receta 1',
        description: 'Receta 1',
        preparationMethod: 'Pasos para preparar esta receta',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20',
      },
      {
        recipeId: '2',
        name: 'Receta 2',
        description: 'Receta 2',
        preparationMethod: 'Pasos para preparar esta receta',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20',
      },
      {
        recipeId: '3',
        name: 'Receta 3',
        description: 'Receta 3',
        preparationMethod: 'Pasos para preparar esta receta',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20',
      },
      {
        recipeId: '4',
        name: 'Receta 4',
        description: 'Receta 4',
        preparationMethod: 'Pasos para preparar esta receta',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20',
      },
      {
        recipeId: '5',
        name: 'Receta 5',
        description: 'Receta 5',
        preparationMethod: 'Pasos para preparar esta receta',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20',
      },
      {
        recipeId: '6',
        name: 'Receta 6',
        description: 'Receta 6',
        preparationMethod: 'Pasos para preparar esta receta',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-20',
      },
    ]);
  });
});
