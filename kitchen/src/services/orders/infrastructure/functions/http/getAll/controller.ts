import { OrderRecipeResponse } from '@services/orders/application/responses/orderRecipeResponse';
import { GetAllOrdersRequest } from '@services/orders/application/useCases/getAll/getAllOrdersRequest';
import { GetAllOrdersUseCase } from '@services/orders/application/useCases/getAll/getAllOrdersUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllOrdersController extends BaseController<GetAllOrdersRequest, OrderRecipeResponse[]> {
  constructor(@inject('GetAllOrdersUseCase') private useCase: GetAllOrdersUseCase) {
    super();
  }

  public async run(request: GetAllOrdersRequest): Promise<OrderRecipeResponse[]> {
    const result = await this.useCase.run(request);

    return result;
  }
}
