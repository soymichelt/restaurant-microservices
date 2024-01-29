import { UserResponse } from '@services/users/application/responses/userResponse';
import { VerifyUserTokenRequest } from '@services/users/application/useCases/verifyUser/verifyUserTokenRequest';
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { UserId } from '@services/users/domain/valueObjects/userId';
import { UserNotFoundException } from '@shared/domain/exceptions/userNotFoundException';
import { UserTokenService } from '@shared/domain/services/userTokenService';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class VerifyUserTokenUseCase extends UseCase<VerifyUserTokenRequest, UserResponse> {
  constructor(
    @inject('UserRepository') private repository: UserRepository,
    @inject('UserTokenService') private tokenService: UserTokenService,
  ) {
    super();
  }

  public async run(request: VerifyUserTokenRequest): Promise<UserResponse> {
    const userPayload = await this.tokenService.verifyAndDecode(request.token);

    const userId = UserId.fromString(userPayload.userId);
    const user = await this.repository.find(userId);
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    const primitives = user.toPrimitives();
    delete primitives.password;
    return { ...primitives };
  }
}
