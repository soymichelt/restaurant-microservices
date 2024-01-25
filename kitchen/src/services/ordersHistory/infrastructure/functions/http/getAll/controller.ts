import { OrderHistoryResponse } from '@services/ordersHistory/application/responses/orderHistoryResponse';
import { GetAllOrdersHistoryRequest } from '@services/ordersHistory/application/useCases/all/getAllOrdersHistoryRequest';
import { GetAllOrdersHistoryUseCase } from '@services/ordersHistory/application/useCases/all/getAllOrdersHistoryUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllOrdersHistoryController extends BaseController<GetAllOrdersHistoryRequest, OrderHistoryResponse[]> {
  constructor(@inject('GetAllOrdersHistoryUseCase') private useCase: GetAllOrdersHistoryUseCase) {
    super();
  }

  public async run(request: GetAllOrdersHistoryRequest): Promise<OrderHistoryResponse[]> {
    const result = await this.useCase.run(request);

    return result;
  }
}
