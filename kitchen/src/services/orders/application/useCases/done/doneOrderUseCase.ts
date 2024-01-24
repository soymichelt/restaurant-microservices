import { OrderResponse } from '@services/orders/application/responses/orderResponse';
import { DoneOrderRequest } from '@services/orders/application/useCases/done/doneOrderRequest';
import { OrderNotFoundException } from '@services/orders/domain/exceptions/orderNotFoundException';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { OrderId } from '@services/orders/domain/valueObjects/orderId';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DoneOrderUseCase extends UseCase<DoneOrderRequest, OrderResponse> {
  constructor(@inject('OrderRepository') private repository: OrderRepository) {
    super();
  }

  public async run(request: DoneOrderRequest): Promise<OrderResponse> {
    const orderId = OrderId.build(request.orderId);

    const order = await this.repository.find(orderId);
    if (!order) {
      throw new OrderNotFoundException(orderId);
    }

    order.markAsDone();

    await this.repository.update(order);
    return order.toPrimitives();
  }
}
