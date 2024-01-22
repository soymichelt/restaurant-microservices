import { IngredientStockDecrementedEvent } from '@services/ingredients/domain/events/ingredientStockDecrementedEvent';
import { IngredientStockIncrementedEvent } from '@services/ingredients/domain/events/ingredientStockIncrementedEvent';
import { IngredientId } from '@services/ingredients/domain/valueObjects/ingredientId';
import { IngredientName } from '@services/ingredients/domain/valueObjects/ingredientName';
import { IngredientStock } from '@services/ingredients/domain/valueObjects/ingredientStock';
import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { DateValueObject } from '@shared/domain/valueObjects/dateValueObject';

export type IngredientProps = {
  ingredientId: IngredientId;
  name: IngredientName;
  stock: IngredientStock;

  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
};

export type IngredientPrimitives = {
  ingredientId: string;
  name: string;
  stock: number;

  createdAt: string;
  updatedAt: string;
};

export class Ingredient extends AggregateRoot {
  private _ingredientId: IngredientId;
  private _name: IngredientName;
  private _stock: IngredientStock;

  private constructor(props: IngredientProps) {
    super();

    this._ingredientId = props.ingredientId;
    this._name = props.name;
    this._stock = props.stock;

    this.createdAt = props.createdAt ?? DateValueObject.now();
    this.updatedAt = props.updatedAt ?? DateValueObject.now();
  }

  public get ingredientId(): IngredientId {
    return this._ingredientId;
  }

  public static build(props: IngredientProps): Ingredient {
    return new Ingredient(props);
  }

  public static fromPrimitives(props: IngredientPrimitives): Ingredient {
    return this.build({
      ingredientId: IngredientId.build(props.ingredientId),
      name: IngredientName.build(props.name),
      stock: IngredientStock.build(props.stock),

      createdAt: DateValueObject.fromString(props.createdAt),
      updatedAt: DateValueObject.fromString(props.updatedAt),
    });
  }

  public addToStock(amount: number): void {
    this.updatedAt = DateValueObject.now();
    this._stock = this._stock.add(amount);

    const event = IngredientStockIncrementedEvent.build(this, amount);
    this.pushEvent(event);
  }

  public removeFromStock(amount: number): void {
    this.updatedAt = DateValueObject.now();
    this._stock = this._stock.remove(amount);

    const event = IngredientStockDecrementedEvent.build(this, amount);
    this.pushEvent(event);
  }

  public toPrimitives(): IngredientPrimitives {
    return {
      ingredientId: this._ingredientId.value,
      name: this._name.value,
      stock: this._stock.value,

      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
}
