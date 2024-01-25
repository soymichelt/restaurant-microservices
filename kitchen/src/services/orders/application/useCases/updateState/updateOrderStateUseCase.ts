import { OrderResponse } from '@services/orders/application/responses/orderResponse';
import { UpdateOrderStateRequest } from '@services/orders/application/useCases/updateState/updateOrderStateRequest';
import { OrderNotFoundException } from '@services/orders/domain/exceptions/orderNotFoundException';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { OrderId } from '@services/orders/domain/valueObjects/orderId';
import { OrderState } from '@services/orders/domain/valueObjects/orderState';
import { EventBus } from '@shared/domain/events/eventBus';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateOrderStateUseCase extends UseCase<UpdateOrderStateRequest, OrderResponse> {
  constructor(
    @inject('OrderRepository') private repository: OrderRepository,
    @inject('EventBus') private eventBus: EventBus,
  ) {
    super();
  }

  public async run(request: UpdateOrderStateRequest): Promise<OrderResponse> {
    const orderId = OrderId.build(request.orderId);
    const newState = OrderState.fromString(request.state);

    const order = await this.repository.find(orderId);
    if (!order) {
      throw new OrderNotFoundException(orderId);
    }

    order.updateState(newState);

    await this.repository.update(order);
    await this.eventBus.publish(order.pullEvents());
    return order.toPrimitives();
  }
}
