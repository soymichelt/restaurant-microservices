import { container } from '@di/shared';
import { GetAllUsersUseCase } from '@services/users/application/useCases/all/getAllUsersUseCase';
import { GetIdentityUseCase } from '@services/users/application/useCases/getIdentity/getIdentityUseCase';
import { NotifyUserRegisteredUseCase } from '@services/users/application/useCases/notifRegistered/notifyUserRegistedUseCase';
import { NotifyUserRemovedUseCase } from '@services/users/application/useCases/notifRemoved/notifyUserRemovedUseCase';
import { RefreshUserTokenUseCase } from '@services/users/application/useCases/refreshToken/refreshUserTokenUseCase';
import { RemoveUserUseCase } from '@services/users/application/useCases/remove/removeUserUseCase';
import { SigninUseCase } from '@services/users/application/useCases/signin/signinUseCase';
import { SingupUserUseCase } from '@services/users/application/useCases/signup/singupUserUseCase';
import { VerifyUserTokenUseCase } from '@services/users/application/useCases/verifyUser/verifyUserTokenUseCase';
import { UserRepository } from '@services/users/domain/repositories/userRepository';
import { VerifyIfAuthorizedController } from '@services/users/infrastructure/functions/authorizer/verifyUser/controller';
import { GetAllUsersController } from '@services/users/infrastructure/functions/http/getAll/controller';
import { GetIdentityController } from '@services/users/infrastructure/functions/http/getIdentity/controller';
import { RefreshUserTokenController } from '@services/users/infrastructure/functions/http/refreshToken/controller';
import { RemoveUserController } from '@services/users/infrastructure/functions/http/remove/controller';
import { SigninController } from '@services/users/infrastructure/functions/http/signin/controller';
import { SignupUserController } from '@services/users/infrastructure/functions/http/signup/controller';
import { NotifyUserRegisteredController } from '@services/users/infrastructure/functions/sns/notifRegistered/controller';
import { NotifyUserRemovedController } from '@services/users/infrastructure/functions/sns/notifRemoved/controller';
import { MongoUserRepository } from '@services/users/infrastructure/persistence/mongodb/MongoUserRepository';

container
  .register<UserRepository>('UserRepository', MongoUserRepository)
  .register<GetAllUsersUseCase>('GetAllUsersUseCase', GetAllUsersUseCase)
  .register<GetAllUsersController>('GetAllUsersController', GetAllUsersController)
  .register<NotifyUserRegisteredUseCase>('NotifyUserRegisteredUseCase', NotifyUserRegisteredUseCase)
  .register<NotifyUserRegisteredController>('NotifyUserRegisteredController', NotifyUserRegisteredController)
  .register<RemoveUserUseCase>('RemoveUserUseCase', RemoveUserUseCase)
  .register<RemoveUserController>('RemoveUserController', RemoveUserController)
  .register<NotifyUserRemovedUseCase>('NotifyUserRemovedUseCase', NotifyUserRemovedUseCase)
  .register<NotifyUserRemovedController>('NotifyUserRemovedController', NotifyUserRemovedController)
  .register<SigninUseCase>('SigninUseCase', SigninUseCase)
  .register<SigninController>('SigninController', SigninController)
  .register<SingupUserUseCase>('SingupUserUseCase', SingupUserUseCase)
  .register<SignupUserController>('SignupUserController', SignupUserController)
  .register<VerifyUserTokenUseCase>('VerifyUserTokenUseCase', VerifyUserTokenUseCase)
  .register<VerifyIfAuthorizedController>('VerifyIfAuthorizedController', VerifyIfAuthorizedController)
  .register<RefreshUserTokenUseCase>('RefreshUserTokenUseCase', RefreshUserTokenUseCase)
  .register<RefreshUserTokenController>('RefreshUserTokenController', RefreshUserTokenController)
  .register<GetIdentityUseCase>('GetIdentityUseCase', GetIdentityUseCase)
  .register<GetIdentityController>('GetIdentityController', GetIdentityController);

export { container };
