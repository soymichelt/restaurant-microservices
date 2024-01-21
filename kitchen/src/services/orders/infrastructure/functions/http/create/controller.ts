import { OrderResponse } from '@services/orders/application/responses/orderResponse';
import { CreateOrderUseCase } from '@services/orders/application/useCases/create/createOrderUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateOrderController extends BaseController<void, OrderResponse> {
  constructor(@inject('CreateOrderUseCase') private useCase: CreateOrderUseCase) {
    super();
  }

  public async run(): Promise<OrderResponse> {
    const result = await this.useCase.run();
    return result;
  }
}
