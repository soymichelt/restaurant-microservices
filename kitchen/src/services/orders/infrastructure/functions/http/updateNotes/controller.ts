import { OrderResponse } from '@services/orders/application/responses/orderResponse';
import { UpdateOrderNotesRequest } from '@services/orders/application/useCases/updateNotes/updateOrderNotesRequest';
import { UpdateOrderNotesUseCase } from '@services/orders/application/useCases/updateNotes/updateOrderNotesUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateOrderNotesController extends BaseController<UpdateOrderNotesRequest, OrderResponse> {
  constructor(@inject('UpdateOrderNotesUseCase') private useCase: UpdateOrderNotesUseCase) {
    super();
  }

  public async run(request: UpdateOrderNotesRequest): Promise<OrderResponse> {
    const result = await this.useCase.run(request);

    return result;
  }
}
