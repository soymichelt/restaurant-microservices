/* eslint-disable max-lines-per-function */
import { Ingredient } from '@services/ingredients/domain/ingredient';
import { IngredientId } from '@services/ingredients/domain/valueObjects/ingredientId';
import { IngredientName } from '@services/ingredients/domain/valueObjects/ingredientName';
import { IngredientStock } from '@services/ingredients/domain/valueObjects/ingredientStock';

describe('Tests Ingredient aggregate root', () => {
  test('Build ingredient instance object', () => {
    const ingredient = Ingredient.build({
      ingredientId: IngredientId.build('5fa46367-8584-41fa-b85d-0fe4b59ddd47'),
      name: IngredientName.build('Tomato'),
      stock: IngredientStock.build(0),
    });

    const result = ingredient.toPrimitives();

    expect(result).toEqual({
      ingredientId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      name: 'Tomato',
      stock: 0,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('Build ingredient from primitives values', () => {
    const ingredient = Ingredient.fromPrimitives({
      ingredientId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      name: 'Tomato',
      stock: 0,

      createdAt: '2024-01-20T00:00:00.000Z',
      updatedAt: '2024-01-20T00:00:00.000Z',
    });

    const result = ingredient.toPrimitives();

    expect(result).toEqual({
      ingredientId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
      name: 'Tomato',
      stock: 0,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  describe('Tests ingredient stock', () => {
    test('Test increment stock', () => {
      const ingredient = Ingredient.build({
        ingredientId: IngredientId.build('5fa46367-8584-41fa-b85d-0fe4b59ddd47'),
        name: IngredientName.build('Tomato'),
        stock: IngredientStock.build(0),
      });

      ingredient.addToStock(100);
      const result = ingredient.toPrimitives();
      const events = ingredient.pullEvents();

      expect(result).toEqual({
        ingredientId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
        name: 'Tomato',
        stock: 100,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
      expect(events.length).toBe(1);
      expect(events[0].toPrimitives()).toEqual({
        aggregateId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
        eventId: expect.any(String),
        eventDate: expect.any(String),
        eventType: 'ingredient.incremented.stock',
        ingredientId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
        ingredientName: 'Tomato',
        ingredientStock: 100,
        ingredientStockIncremented: 100,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    test('Test decrement stock', () => {
      const ingredient = Ingredient.build({
        ingredientId: IngredientId.build('5fa46367-8584-41fa-b85d-0fe4b59ddd47'),
        name: IngredientName.build('Tomato'),
        stock: IngredientStock.build(100),
      });

      ingredient.removeFromStock(50);
      const result = ingredient.toPrimitives();

      expect(result).toEqual({
        ingredientId: '5fa46367-8584-41fa-b85d-0fe4b59ddd47',
        name: 'Tomato',
        stock: 50,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    test('Test decrease stock below existing stock', () => {
      const ingredient = Ingredient.build({
        ingredientId: IngredientId.build('5fa46367-8584-41fa-b85d-0fe4b59ddd47'),
        name: IngredientName.build('Tomato'),
        stock: IngredientStock.build(100),
      });

      expect(() => ingredient.removeFromStock(150)).toThrow(
        'Ingredient stock invalid. Stock must be greater than or equal to zero.',
      );
    });
  });
});
