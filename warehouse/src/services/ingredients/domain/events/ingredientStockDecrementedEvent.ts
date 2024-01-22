import { Ingredient } from '@services/ingredients/domain/ingredient';
import { BaseEventPrimitivesProps } from '@shared/domain/events/baseEvent';
import { DomainEvent } from '@shared/domain/events/domainEvent';

type IngredientStockDecrementedEventPrimitives = BaseEventPrimitivesProps & {
  ingredientId: string;
  ingredientName: string;
  ingredientStock: number;
  ingredientStockDecremented: number;

  createdAt: string;
  updatedAt: string;
};

export class IngredientStockDecrementedEvent extends DomainEvent {
  public static override EVENT_NAME: string = 'ingredient.decremented.stock';

  private readonly ingredient: Ingredient;
  private readonly ingredientStockDecremented: number;

  private constructor(ingredient: Ingredient, ingredientStockDecremented: number) {
    super({
      aggregateId: ingredient.ingredientId.value,
      eventType: IngredientStockDecrementedEvent.EVENT_NAME,
    });

    this.ingredient = ingredient;
    this.ingredientStockDecremented = ingredientStockDecremented;
  }

  public static build(ingredient: Ingredient, ingredientStockDecremented: number): IngredientStockDecrementedEvent {
    return new IngredientStockDecrementedEvent(ingredient, ingredientStockDecremented);
  }

  public toPrimitives(): IngredientStockDecrementedEventPrimitives {
    const ingredientPrimitives = this.ingredient.toPrimitives();

    return {
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      eventDate: this.eventDate.toISOString(),
      eventType: this.eventType,
      ingredientId: ingredientPrimitives.ingredientId,
      ingredientName: ingredientPrimitives.name,
      ingredientStock: ingredientPrimitives.stock,
      ingredientStockDecremented: this.ingredientStockDecremented,

      createdAt: ingredientPrimitives.createdAt,
      updatedAt: ingredientPrimitives.updatedAt,
    };
  }
}
