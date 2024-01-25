import { Order } from '@services/orders/domain/order';
import { BaseEventPrimitivesProps } from '@shared/domain/events/baseEvent';
import { DomainEvent } from '@shared/domain/events/domainEvent';
import { OrderState } from '@shared/domain/valueObjects/orderState';

type OrderStateUpdatedEventPrimitives = BaseEventPrimitivesProps & {
  orderId: string;
  recipeId: string;
  state: string;
  prevState: string;
  createdAt: string;
  updatedAt: string;
};

export class OrderStateUpdatedEvent extends DomainEvent {
  public static override EVENT_NAME: string = 'order.updated.state';

  private readonly order: Order;
  private readonly prevState: OrderState;

  private constructor(order: Order, prevState: OrderState) {
    super({
      aggregateId: order.orderId.value,
      eventType: OrderStateUpdatedEvent.EVENT_NAME,
    });

    this.order = order;
    this.prevState = prevState;
  }

  public static build(order: Order, prevState: OrderState): OrderStateUpdatedEvent {
    return new OrderStateUpdatedEvent(order, prevState);
  }

  public toPrimitives(): OrderStateUpdatedEventPrimitives {
    const orderPrimitives = this.order.toPrimitives();

    return {
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      eventDate: this.eventDate.toISOString(),
      eventType: this.eventType,
      orderId: orderPrimitives.orderId,
      recipeId: orderPrimitives.recipeId,
      state: orderPrimitives.state,
      prevState: this.prevState.value,
      createdAt: orderPrimitives.createdAt,
      updatedAt: orderPrimitives.updatedAt,
    };
  }
}
