import { CreateOrderHistoryRequest } from '@services/ordersHistory/application/useCases/create/createOrderHistoryRequest';
import { OrderHistory } from '@services/ordersHistory/domain/orderHistory';
import { OrderHistoryRepository } from '@services/ordersHistory/domain/repositories/orderHistoryRepository';
import { UseCase } from '@shared/domain/useCases/useCase';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { OrderState } from '@shared/domain/valueObjects/orderState';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateOrderHistoryUseCase extends UseCase<CreateOrderHistoryRequest, void> {
  constructor(@inject('OrderHistoryRepository') private repository: OrderHistoryRepository) {
    super();
  }

  public async run(request: CreateOrderHistoryRequest): Promise<void> {
    const orderId = OrderId.build(request.orderId);
    const state = OrderState.fromString(request.state);
    const prevState = OrderState.fromString(request.prevState);

    const orderHistory = OrderHistory.build({
      orderId,
      state,
      prevState,
    });

    await this.repository.update(orderHistory);
  }
}
