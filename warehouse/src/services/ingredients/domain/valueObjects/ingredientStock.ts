import { IngredientStockInvalidException } from '@services/ingredients/domain/exceptions/ingredientStockInvalidException';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';

export class IngredientStock extends IntegerValueObject {
  private constructor(value: number) {
    super(value);
    this.validateStock(value);
  }
  public static override build(value: number) {
    return new IngredientStock(value);
  }

  public add(quantity: number): IngredientStock {
    return new IngredientStock(this.value + quantity);
  }

  public remove(quantity: number): IngredientStock {
    const newStock = this.value - quantity;
    this.validateStock(newStock);
    return new IngredientStock(this.value - quantity);
  }

  private validateStock(value: number) {
    if (value < 0) {
      throw new IngredientStockInvalidException(value);
    }
  }
}
