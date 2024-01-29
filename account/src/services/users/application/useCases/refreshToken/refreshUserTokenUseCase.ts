import { UserAuthenticatedResponse } from '@services/users/application/responses/userAuthenticatedResponse';
import { RefreshUserTokenRequest } from '@services/users/application/useCases/refreshToken/refreshUserTokenRequest';
import { UserTokenService } from '@shared/domain/services/userTokenService';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RefreshUserTokenUseCase extends UseCase<RefreshUserTokenRequest, UserAuthenticatedResponse> {
  constructor(@inject('UserTokenService') private tokenService: UserTokenService) {
    super();
  }

  public async run(request: RefreshUserTokenRequest): Promise<UserAuthenticatedResponse> {
    const payload = await this.tokenService.verifyAndDecode(request.token);
    const newToken = await this.tokenService.encode(payload);

    return { token: newToken };
  }
}
