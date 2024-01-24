import { MovementResponse } from '@services/movements/application/responses/movementResponse';
import { RegisterOutputMovementRequest } from '@services/movements/application/useCases/registerOutput/registerOutputMovementRequest';
import { RegisterOutputMovementUseCase } from '@services/movements/application/useCases/registerOutput/registerOutputMovementUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RegisterOutputMovementController extends BaseController<RegisterOutputMovementRequest, MovementResponse> {
  constructor(@inject('RegisterOutputMovementUseCase') private useCase: RegisterOutputMovementUseCase) {
    super();
  }

  public async run(request: RegisterOutputMovementRequest): Promise<MovementResponse> {
    const result = await this.useCase.run(request);

    return result;
  }
}
