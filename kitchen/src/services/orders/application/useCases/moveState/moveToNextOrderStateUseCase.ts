import { OrderResponse } from '@services/orders/application/responses/orderResponse';
import { MoveToNextOrderStateRequest } from '@services/orders/application/useCases/moveState/moveToNextOrderStateRequest';
import { OrderNotFoundException } from '@services/orders/domain/exceptions/orderNotFoundException';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { EventBus } from '@shared/domain/events/eventBus';
import { UseCase } from '@shared/domain/useCases/useCase';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { inject, injectable } from 'tsyringe';

@injectable()
export class MoveToNextOrderStateUseCase extends UseCase<MoveToNextOrderStateRequest, OrderResponse> {
  constructor(
    @inject('OrderRepository') private repository: OrderRepository,
    @inject('EventBus') private eventBus: EventBus,
  ) {
    super();
  }

  public async run(request: MoveToNextOrderStateRequest): Promise<OrderResponse> {
    const orderId = OrderId.build(request.orderId);

    const order = await this.repository.find(orderId);
    if (!order) {
      throw new OrderNotFoundException(orderId);
    }

    order.markAsNextState();

    await this.repository.update(order);
    await this.eventBus.publish(order.pullEvents());
    return order.toPrimitives();
  }
}
