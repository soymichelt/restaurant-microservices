import { Recipe } from '@services/recipes/domain/recipe';
import { RecipeDescription } from '@services/recipes/domain/valueObjects/recipeDescription';
import { RecipeName } from '@services/recipes/domain/valueObjects/recipeName';
import { RecipePreparationMethod } from '@services/recipes/domain/valueObjects/recipePreparationMethod';
import { RecipeId } from '@shared/domain/valueObjects/recipeId';

describe('Tests Recipe aggregate root', () => {
  test('Create recipe instance object', () => {
    const recipe = Recipe.build({
      recipeId: RecipeId.build('4d646367-8584-41fa-b85d-0fe4b59ddd47'),
      name: RecipeName.build('Ensalada de pollo'),
      description: RecipeDescription.build('Ensalada de lechuga con tomate y pollo'),
      preparationMethod: RecipePreparationMethod.build('Corte los vegetales y revuelva con el pollo'),
    });

    const result = recipe.toPrimitives();

    expect(result).toEqual({
      recipeId: '4d646367-8584-41fa-b85d-0fe4b59ddd47',
      name: 'Ensalada de pollo',
      description: 'Ensalada de lechuga con tomate y pollo',
      preparationMethod: 'Corte los vegetales y revuelva con el pollo',
      ingredients: [],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('Create recipe from primitives values', () => {
    const recipe = Recipe.fromPrimitives({
      recipeId: '4d646367-8584-41fa-b85d-0fe4b59ddd47',
      name: 'Ensalada de pollo',
      description: 'Ensalada de lechuga con tomate y pollo',
      preparationMethod: 'Corte los vegetales y revuelva con el pollo',
      ingredients: [],
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
    });

    const result = recipe.toPrimitives();

    expect(result).toEqual({
      recipeId: '4d646367-8584-41fa-b85d-0fe4b59ddd47',
      name: 'Ensalada de pollo',
      description: 'Ensalada de lechuga con tomate y pollo',
      preparationMethod: 'Corte los vegetales y revuelva con el pollo',
      ingredients: [],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
