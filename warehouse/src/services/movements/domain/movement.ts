import { IngredientId } from '@services/ingredients/domain/valueObjects/ingredientId';
import { MovementConcept } from '@services/movements/domain/valueObjects/movementConcept';
import { MovementId } from '@services/movements/domain/valueObjects/movementId';
import { MovementNumber } from '@services/movements/domain/valueObjects/movementNumber';
import { MovementQuantity } from '@services/movements/domain/valueObjects/movementQuantity';
import { MovementStock } from '@services/movements/domain/valueObjects/movementStock';
import { MovementType } from '@services/movements/domain/valueObjects/movementType';
import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { DateValueObject } from '@shared/domain/valueObjects/dateValueObject';

export type MovementProps = {
  movementId: MovementId;
  movementNumber: MovementNumber;
  type: MovementType;
  concept: MovementConcept;
  quantity: MovementQuantity;
  stock: MovementStock;
  ingredientId: IngredientId;

  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
};

export type MovementPrimitives = {
  movementId: string;
  movementNumber: number;
  type: string;
  concept: string;
  quantity: number;
  stock: number;
  ingredientId: string;

  createdAt: string;
  updatedAt: string;
};

export class Movement extends AggregateRoot {
  private _movementId: MovementId;
  private _movementNumber: MovementNumber;
  private _type: MovementType;
  private _concept: MovementConcept;
  private _quantity: MovementQuantity;
  private _stock: MovementStock;
  private _ingredientId: IngredientId;

  private constructor(props: MovementProps) {
    super();

    this._movementId = props.movementId;
    this._movementNumber = props.movementNumber;
    this._type = props.type;
    this._concept = props.concept;
    this._quantity = props.quantity;
    this._stock = props.stock;
    this._ingredientId = props.ingredientId;

    this.createdAt = props.createdAt ?? DateValueObject.now();
    this.updatedAt = props.updatedAt ?? DateValueObject.now();
  }

  public get movementId(): MovementId {
    return this._movementId;
  }

  public static build(props: MovementProps): Movement {
    return new Movement(props);
  }

  public static fromPrimitives(props: MovementPrimitives): Movement {
    return this.build({
      movementId: MovementId.build(props.movementId),
      movementNumber: props.movementNumber ? MovementNumber.build(props.movementNumber) : undefined,
      type: MovementType.fromString(props.type),
      concept: MovementConcept.build(props.concept),
      quantity: MovementQuantity.build(props.quantity),
      stock: MovementStock.build(props.stock),
      ingredientId: IngredientId.build(props.ingredientId),

      createdAt: DateValueObject.fromString(props.createdAt),
      updatedAt: DateValueObject.fromString(props.updatedAt),
    });
  }

  public toPrimitives(): MovementPrimitives {
    return {
      movementId: this._movementId.value,
      movementNumber: this._movementNumber?.value,
      type: this._type.value,
      concept: this._concept.value,
      quantity: this._quantity.value,
      stock: this._stock.value,
      ingredientId: this._ingredientId.value,

      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
}
