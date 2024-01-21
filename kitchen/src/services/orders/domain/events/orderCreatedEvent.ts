import { Order } from '@services/orders/domain/order';
import { BaseEventPrimitivesProps } from '@shared/domain/events/baseEvent';
import { DomainEvent } from '@shared/domain/events/domainEvent';

type OrderCreatedEventPrimitives = BaseEventPrimitivesProps & {
  orderId: string;
  recipeId: string;
  state: string;
  createdAt: string;
  updatedAt: string;
};

export class OrderCreatedEvent extends DomainEvent {
  public static override EVENT_NAME: string = 'order.created';

  private readonly order: Order;

  private constructor(order: Order) {
    super({
      aggregateId: order.orderId.value,
      eventType: OrderCreatedEvent.EVENT_NAME,
    });

    this.order = order;
  }

  public static build(order: Order): OrderCreatedEvent {
    return new OrderCreatedEvent(order);
  }

  public toPrimitives(): OrderCreatedEventPrimitives {
    const orderPrimitives = this.order.toPrimitives();

    return {
      aggregateId: this.aggregateId,
      eventId: this.eventId,
      eventDate: this.eventDate.toISOString(),
      eventType: this.eventType,
      orderId: orderPrimitives.orderId,
      recipeId: orderPrimitives.recipeId,
      state: orderPrimitives.state,
      createdAt: orderPrimitives.createdAt,
      updatedAt: orderPrimitives.updatedAt,
    };
  }
}
