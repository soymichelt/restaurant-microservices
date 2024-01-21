import { OrderRecipeResponse } from '@services/orders/application/responses/orderRecipeResponse';
import { GetAllOrdersUseCase } from '@services/orders/application/useCases/getAll/getAllOrdersUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllOrdersController extends BaseController<void, OrderRecipeResponse[]> {
  constructor(@inject('GetAllOrdersUseCase') private useCase: GetAllOrdersUseCase) {
    super();
  }

  public async run(): Promise<OrderRecipeResponse[]> {
    const result = await this.useCase.run();
    return result;
  }
}
