import { UserAuthenticatedResponse } from '@services/users/application/responses/userAuthenticatedResponse';
import { RefreshUserTokenUseCase } from '@services/users/application/useCases/refreshToken/refreshUserTokenUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

type AuthorizationTokenRequest = {
  headers: {
    authorization: string;
  };
};

@injectable()
export class RefreshUserTokenController extends BaseController<AuthorizationTokenRequest, UserAuthenticatedResponse> {
  constructor(@inject('RefreshUserTokenUseCase') private useCase: RefreshUserTokenUseCase) {
    super();
  }

  public async run(request: AuthorizationTokenRequest): Promise<UserAuthenticatedResponse> {
    const { authorization: token } = request.headers;

    const result = await this.useCase.run({
      token: token?.replace('Bearer ', ''),
    });

    return result;
  }
}
