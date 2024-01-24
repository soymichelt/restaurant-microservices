import { UserAuthenticatedResponse } from '@services/users/application/responses/userAuthenticatedResponse';
import { SignupUserRequest } from '@services/users/application/useCases/signup/singupUserRequest';
import { SingupUserUseCase } from '@services/users/application/useCases/signup/singupUserUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class SignupUserController extends BaseController<SignupUserRequest, UserAuthenticatedResponse> {
  constructor(@inject('SingupUserUseCase') private useCase: SingupUserUseCase) {
    super();
  }

  public async run(request: SignupUserRequest): Promise<UserAuthenticatedResponse> {
    const result = await this.useCase.run(request);

    return result;
  }

  protected override getSuccessStatusCode(): number {
    return 201;
  }
}
