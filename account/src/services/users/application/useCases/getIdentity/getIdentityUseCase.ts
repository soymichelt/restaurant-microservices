import { UserIdentityResponse } from '@services/users/application/responses/userIdentityResponse';
import { GetIdentityRequest } from '@services/users/application/useCases/getIdentity/getIdentityRequest';
import { UserId } from '@services/users/domain/valueObjects/userId';
import { GetIdentityService } from '@shared/domain/services/getIdentityService';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetIdentityUseCase extends UseCase<GetIdentityRequest, UserIdentityResponse> {
  constructor(@inject('GetIdentityService') private identityService: GetIdentityService) {
    super();
  }

  public async run(request: GetIdentityRequest): Promise<UserIdentityResponse> {
    const userId = UserId.fromString(request.userId);
    const result = await this.identityService.getIdentity(userId);
    return { authToken: result };
  }
}
