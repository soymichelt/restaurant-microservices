import { OrderResponse } from '@services/orders/application/responses/orderResponse';
import { DoneOrderRequest } from '@services/orders/application/useCases/done/doneOrderRequest';
import { DoneOrderUseCase } from '@services/orders/application/useCases/done/doneOrderUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DoneOrderController extends BaseController<DoneOrderRequest, OrderResponse> {
  constructor(@inject('DoneOrderUseCase') private useCase: DoneOrderUseCase) {
    super();
  }

  public async run(request: DoneOrderRequest): Promise<OrderResponse> {
    const result = await this.useCase.run(request);
    return result;
  }
}
