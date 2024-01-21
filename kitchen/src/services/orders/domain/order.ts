import { OrderCreatedEvent } from '@services/orders/domain/events/orderCreatedEvent';
import { OrderId } from '@services/orders/domain/valueObjects/orderId';
import { OrderState } from '@services/orders/domain/valueObjects/orderState';
import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { DateValueObject } from '@shared/domain/valueObjects/dateValueObject';
import { RecipeId } from '@shared/domain/valueObjects/recipeId';

export type OrderProps = {
  orderId: OrderId;
  recipeId: RecipeId;
  state: OrderState;

  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
};

export type OrderPrimitives = {
  orderId: string;
  recipeId: string;
  state: string;

  createdAt: string;
  updatedAt: string;
};

export class Order extends AggregateRoot {
  private _orderId: OrderId;
  private _recipeId: RecipeId;
  private _state: OrderState;

  private constructor(props: OrderProps) {
    super();

    this._orderId = props.orderId;
    this._recipeId = props.recipeId;
    this._state = props.state;

    this.createdAt = props.createdAt ?? DateValueObject.now();
    this.updatedAt = props.updatedAt ?? DateValueObject.now();
  }

  public get orderId(): OrderId {
    return this._orderId;
  }

  public get recipeId(): RecipeId {
    return this._recipeId;
  }

  public static build(props: OrderProps): Order {
    return new Order(props);
  }

  public static create(props: OrderProps): Order {
    const newOrder = this.build(props);
    const event = OrderCreatedEvent.build(newOrder);
    newOrder.pushEvent(event);
    return newOrder;
  }

  public static fromPrimitives(props: OrderPrimitives): Order {
    return this.build({
      orderId: OrderId.build(props.orderId),
      recipeId: RecipeId.build(props.recipeId),
      state: OrderState.fromString(props.state),

      createdAt: DateValueObject.fromString(props.createdAt),
      updatedAt: DateValueObject.fromString(props.updatedAt),
    });
  }

  public toPrimitives(): OrderPrimitives {
    return {
      orderId: this._orderId.value,
      recipeId: this._recipeId.value,
      state: this._state.value,

      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
}
