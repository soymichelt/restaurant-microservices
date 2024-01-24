import { PrepareOrderRequest } from '@services/orders/application/useCases/prepare/prepareOrderRequest';
import { PrepareOrderUseCase } from '@services/orders/application/useCases/prepare/prepareOrderUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PrepareOrderController extends BaseController<PrepareOrderRequest, void> {
  constructor(@inject('PrepareOrderUseCase') private useCase: PrepareOrderUseCase) {
    super();
  }

  public async run(request: PrepareOrderRequest): Promise<void> {
    await this.useCase.run(request);
  }
}
