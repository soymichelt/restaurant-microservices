import { OrderHistoryResponse } from '@services/ordersHistory/application/responses/orderHistoryResponse';
import { GetAllOrdersHistoryRequest } from '@services/ordersHistory/application/useCases/all/getAllOrdersHistoryRequest';
import { OrderHistoryRepository } from '@services/ordersHistory/domain/repositories/orderHistoryRepository';
import { UseCase } from '@shared/domain/useCases/useCase';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllOrdersHistoryUseCase extends UseCase<GetAllOrdersHistoryRequest, OrderHistoryResponse[]> {
  constructor(@inject('OrderHistoryRepository') private repository: OrderHistoryRepository) {
    super();
  }

  public async run(request: GetAllOrdersHistoryRequest): Promise<OrderHistoryResponse[]> {
    const orderId = OrderId.build(request.orderId);
    const ordersHistory = await this.repository.all(orderId);
    return ordersHistory.map((orderHistory) => orderHistory.toPrimitives());
  }
}
