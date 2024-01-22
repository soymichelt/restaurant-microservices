import { Ingredient } from '@services/ingredients/domain/ingredient';
import { BaseEventPrimitivesProps } from '@shared/domain/events/baseEvent';
import { DomainEvent } from '@shared/domain/events/domainEvent';

type IngredientStockIncrementedEventPrimitives = BaseEventPrimitivesProps & {
  ingredientId: string;
  ingredientName: string;
  ingredientStock: number;
  ingredientStockIncremented: number;

  createdAt: string;
  updatedAt: string;
};

export class IngredientStockIncrementedEvent extends DomainEvent {
  public static override EVENT_NAME: string = 'ingredient.incremented.stock';

  private readonly ingredient: Ingredient;
  private readonly ingredientStockIncremented: number;

  private constructor(ingredient: Ingredient, ingredientStockIncremented: number) {
    super({
      aggregateId: ingredient.ingredientId.value,
      eventType: IngredientStockIncrementedEvent.EVENT_NAME,
    });

    this.ingredient = ingredient;
    this.ingredientStockIncremented = ingredientStockIncremented;
  }

  public static build(ingredient: Ingredient, ingredientStockIncremented: number): IngredientStockIncrementedEvent {
    return new IngredientStockIncrementedEvent(ingredient, ingredientStockIncremented);
  }

  public toPrimitives(): IngredientStockIncrementedEventPrimitives {
    const ingredientPrimitives = this.ingredient.toPrimitives();

    return {
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      eventDate: this.eventDate.toISOString(),
      eventType: this.eventType,
      ingredientId: ingredientPrimitives.ingredientId,
      ingredientName: ingredientPrimitives.name,
      ingredientStock: ingredientPrimitives.stock,
      ingredientStockIncremented: this.ingredientStockIncremented,

      createdAt: ingredientPrimitives.createdAt,
      updatedAt: ingredientPrimitives.updatedAt,
    };
  }
}
