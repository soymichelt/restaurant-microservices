import { OrderHistoryId } from '@services/ordersHistory/domain/valueObjects/orderHistoryId';
import { AggregateRoot } from '@shared/domain/aggregateRoot';
import { DateValueObject } from '@shared/domain/valueObjects/dateValueObject';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { OrderState } from '@shared/domain/valueObjects/orderState';

export type OrderHistoryProps = {
  orderHistoryId: OrderHistoryId;
  orderId: OrderId;
  state: OrderState;
  prevState: OrderState;

  createdAt?: DateValueObject;
  updatedAt?: DateValueObject;
};

export type OrderHistoryPrimitives = {
  orderHistoryId: string;
  orderId: string;
  state: string;
  prevState: string;

  createdAt: string;
  updatedAt: string;
};

export class OrderHistory extends AggregateRoot {
  private _orderHistoryId: OrderHistoryId;
  private _orderId: OrderId;
  private _state: OrderState;
  private _prevState: OrderState;

  private constructor(props: OrderHistoryProps) {
    super();

    this._orderHistoryId = props.orderHistoryId;
    this._orderId = props.orderId;
    this._state = props.state;
    this._prevState = props.prevState;

    this.createdAt = props.createdAt ?? DateValueObject.now();
    this.updatedAt = props.updatedAt ?? DateValueObject.now();
  }

  public get orderHistoryId(): OrderHistoryId {
    return this._orderHistoryId;
  }

  public get orderId(): OrderId {
    return this._orderId;
  }

  public static build(props: OrderHistoryProps): OrderHistory {
    return new OrderHistory(props);
  }

  public static fromPrimitives(props: OrderHistoryPrimitives): OrderHistory {
    return this.build({
      orderHistoryId: props.orderHistoryId ? OrderHistoryId.build(props.orderHistoryId) : OrderHistoryId.newId(),
      orderId: OrderId.build(props.orderId),
      state: OrderState.fromString(props.state),
      prevState: OrderState.fromString(props.prevState),

      createdAt: DateValueObject.fromString(props.createdAt),
      updatedAt: DateValueObject.fromString(props.updatedAt),
    });
  }

  public toPrimitives(): OrderHistoryPrimitives {
    return {
      orderHistoryId: this._orderHistoryId.value,
      orderId: this._orderId.value,
      state: this._state.value,
      prevState: this._prevState.value,

      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
}
