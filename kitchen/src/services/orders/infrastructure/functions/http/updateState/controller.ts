import { OrderResponse } from '@services/orders/application/responses/orderResponse';
import { UpdateOrderStateRequest } from '@services/orders/application/useCases/updateState/updateOrderStateRequest';
import { UpdateOrderStateUseCase } from '@services/orders/application/useCases/updateState/updateOrderStateUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateOrderStateController extends BaseController<UpdateOrderStateRequest, OrderResponse> {
  constructor(@inject('UpdateOrderStateUseCase') private useCase: UpdateOrderStateUseCase) {
    super();
  }

  public async run(request: UpdateOrderStateRequest): Promise<OrderResponse> {
    const result = await this.useCase.run(request);
    return result;
  }
}
