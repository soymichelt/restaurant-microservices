import { UserIdentityResponse } from '@services/users/application/responses/userIdentityResponse';
import { GetIdentityRequest } from '@services/users/application/useCases/getIdentity/getIdentityRequest';
import { GetIdentityUseCase } from '@services/users/application/useCases/getIdentity/getIdentityUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetIdentityController extends BaseController<GetIdentityRequest, UserIdentityResponse> {
  constructor(@inject('GetIdentityUseCase') private useCase: GetIdentityUseCase) {
    super();
  }

  public async run(request: GetIdentityRequest): Promise<UserIdentityResponse> {
    const result = await this.useCase.run(request);

    return result;
  }
}
