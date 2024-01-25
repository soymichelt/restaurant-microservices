import { CreateOrderHistoryRequest } from '@services/ordersHistory/application/useCases/create/createOrderHistoryRequest';
import { CreateOrderHistoryUseCase } from '@services/ordersHistory/application/useCases/create/createOrderHistoryUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateOrderHistoryController extends BaseController<CreateOrderHistoryRequest, void> {
  constructor(@inject('CreateOrderHistoryUseCase') private useCase: CreateOrderHistoryUseCase) {
    super();
  }

  public async run(request: CreateOrderHistoryRequest): Promise<void> {
    await this.useCase.run(request);
  }
}
