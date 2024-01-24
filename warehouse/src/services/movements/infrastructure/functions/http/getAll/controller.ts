import { MovementResponse } from '@services/movements/application/responses/movementResponse';
import { GetAllMovementsRequest } from '@services/movements/application/useCases/getAll/getAllMovementsRequest';
import { GetAllMovementsUseCase } from '@services/movements/application/useCases/getAll/getAllMovementsUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllMovementsController extends BaseController<GetAllMovementsRequest, MovementResponse[]> {
  constructor(@inject('GetAllMovementsUseCase') private useCase: GetAllMovementsUseCase) {
    super();
  }

  public async run(request: GetAllMovementsRequest): Promise<MovementResponse[]> {
    const result = await this.useCase.run(request);
    return result;
  }
}
