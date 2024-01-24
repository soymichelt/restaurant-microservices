import { OrderStockResponse } from '@services/ingredients/application/responses/orderStockResponse';
import { OrderIngredientStockRequest } from '@services/ingredients/application/useCases/orderStock/orderIngredientStockRequest';
import { OrderIngredientStockUseCase } from '@services/ingredients/application/useCases/orderStock/orderIngredientStockUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class OrderIngredientStockController extends BaseController<OrderIngredientStockRequest, OrderStockResponse> {
  constructor(@inject('OrderIngredientStockUseCase') private useCase: OrderIngredientStockUseCase) {
    super();
  }

  public async run(request: OrderIngredientStockRequest): Promise<OrderStockResponse> {
    const result = await this.useCase.run(request);
    return result;
  }
}
