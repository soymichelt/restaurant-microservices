import { OrderResponse } from '@services/orders/application/responses/orderResponse';
import { MoveToNextOrderStateRequest } from '@services/orders/application/useCases/moveState/moveToNextOrderStateRequest';
import { MoveToNextOrderStateUseCase } from '@services/orders/application/useCases/moveState/moveToNextOrderStateUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class MoveToNextOrderStateController extends BaseController<MoveToNextOrderStateRequest, OrderResponse> {
  constructor(@inject('MoveToNextOrderStateUseCase') private useCase: MoveToNextOrderStateUseCase) {
    super();
  }

  public async run(request: MoveToNextOrderStateRequest): Promise<OrderResponse> {
    const result = await this.useCase.run(request);
    return result;
  }
}
