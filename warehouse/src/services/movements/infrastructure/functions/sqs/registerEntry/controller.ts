import { MovementResponse } from '@services/movements/application/responses/movementResponse';
import { RegisterEntryMovementRequest } from '@services/movements/application/useCases/registerEntry/registerEntryMovementRequest';
import { RegisterEntryMovementUseCase } from '@services/movements/application/useCases/registerEntry/registerEntryMovementUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RegisterEntryMovementController extends BaseController<RegisterEntryMovementRequest, MovementResponse> {
  constructor(@inject('RegisterEntryMovementUseCase') private useCase: RegisterEntryMovementUseCase) {
    super();
  }

  public async run(request: RegisterEntryMovementRequest): Promise<MovementResponse> {
    const result = await this.useCase.run(request);

    return result;
  }
}
