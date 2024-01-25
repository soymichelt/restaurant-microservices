import { OrderResponse } from '@services/orders/application/responses/orderResponse';
import { UpdateOrderNotesRequest } from '@services/orders/application/useCases/updateNotes/updateOrderNotesRequest';
import { OrderNotFoundException } from '@services/orders/domain/exceptions/orderNotFoundException';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { OrderId } from '@services/orders/domain/valueObjects/orderId';
import { OrderNotes } from '@services/orders/domain/valueObjects/orderNotes';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateOrderNotesUseCase extends UseCase<UpdateOrderNotesRequest, OrderResponse> {
  constructor(@inject('OrderRepository') private repository: OrderRepository) {
    super();
  }

  public async run(request: UpdateOrderNotesRequest): Promise<OrderResponse> {
    const orderId = OrderId.build(request.orderId);
    const newNotes = OrderNotes.build(request.notes);

    const order = await this.repository.find(orderId);
    if (!order) {
      throw new OrderNotFoundException(orderId);
    }

    order.updateNotes(newNotes);

    await this.repository.update(order);
    return order.toPrimitives();
  }
}
