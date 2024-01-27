import { OrderCreatedEvent } from '@services/orders/domain/events/orderCreatedEvent';
import { OrderStateUpdatedEvent } from '@services/orders/domain/events/orderStateUpdatedEvent';
import { OrderStateInvalidException } from '@services/orders/domain/exceptions/orderStateInvalidException';
import { OrderNotes } from '@services/orders/domain/valueObjects/orderNotes';
import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { DateValueObject } from '@shared/domain/valueObjects/dateValueObject';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { OrderState } from '@shared/domain/valueObjects/orderState';
import { RecipeId } from '@shared/domain/valueObjects/recipeId';

export type OrderProps = {
  orderId: OrderId;
  recipeId: RecipeId;
  state: OrderState;
  notes?: OrderNotes;

  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
};

export type OrderPrimitives = {
  orderId: string;
  recipeId: string;
  state: string;
  notes?: string;

  createdAt: string;
  updatedAt: string;
};

export class Order extends AggregateRoot {
  private _orderId: OrderId;
  private _recipeId: RecipeId;
  private _state: OrderState;
  private _notes: OrderNotes;

  private constructor(props: OrderProps) {
    super();

    this._orderId = props.orderId;
    this._recipeId = props.recipeId;
    this._state = props.state;
    this._notes = props.notes;

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
      notes: props.notes ? OrderNotes.build(props.notes) : undefined,

      createdAt: DateValueObject.fromString(props.createdAt),
      updatedAt: DateValueObject.fromString(props.updatedAt),
    });
  }

  public updateNotes(notes: OrderNotes): void {
    this.updatedAt = DateValueObject.now();
    this._notes = notes;
  }

  public markAsInProgress(): void {
    this.updatedAt = DateValueObject.now();
    this.changeState(OrderState.inProgress());
  }

  public markAsNextState(): void {
    if (this._state.isFinalState()) {
      throw new OrderStateInvalidException(this._orderId, this._state);
    }

    this.updatedAt = DateValueObject.now();
    this.changeState(this._state.nextStep());
  }

  public updateState(newState: OrderState): void {
    if (newState.isTodo()) {
      throw new OrderStateInvalidException(this._orderId, this._state, newState);
    }

    this.updatedAt = DateValueObject.now();
    this.changeState(newState);
  }

  public isTodo(): boolean {
    return this._state.isTodo();
  }

  public requestOrderAgain(): void {
    const timeAgo = this.calculateTimeAgoInSeconds();
    if (timeAgo < 30) return;

    this.updatedAt = DateValueObject.now();
    const event = OrderCreatedEvent.build(this);
    this.pushEvent(event);
  }

  public toPrimitives(): OrderPrimitives {
    return {
      orderId: this._orderId.value,
      recipeId: this._recipeId.value,
      state: this._state.value,
      notes: this._notes?.value,

      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }

  private changeState(newState: OrderState): void {
    const prevState = this._state;
    this._state = newState;
    const event = OrderStateUpdatedEvent.build(this, prevState);
    this.pushEvent(event);
  }

  private calculateTimeAgoInSeconds(): number {
    const difference = Math.abs(new Date().getTime() - this.updatedAt.value.getTime());
    const differenceInSeconds = Math.floor(difference / 1000);
    return differenceInSeconds;
  }
}
