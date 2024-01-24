import { container } from '@di/shared';
import { GetAllMovementsUseCase } from '@services/movements/application/useCases/getAll/getAllMovementsUseCase';
import { RegisterEntryMovementUseCase } from '@services/movements/application/useCases/registerEntry/registerEntryMovementUseCase';
import { RegisterOutputMovementUseCase } from '@services/movements/application/useCases/registerOutput/registerOutputMovementUseCase';
import { MovementRepository } from '@services/movements/domain/repositories/movementRepository';
import { GetAllMovementsController } from '@services/movements/infrastructure/functions/http/getAll/controller';
import { RegisterEntryMovementController } from '@services/movements/infrastructure/functions/sqs/registerEntry/controller';
import { RegisterOutputMovementController } from '@services/movements/infrastructure/functions/sqs/registerOutput/controller';
import { MongoMovementRepository } from '@services/movements/infrastructure/persistence/mongodb/mongoMovementRepository';

container
  .register<MovementRepository>('MovementRepository', MongoMovementRepository)
  .register<RegisterEntryMovementUseCase>('RegisterEntryMovementUseCase', RegisterEntryMovementUseCase)
  .register<RegisterEntryMovementController>('RegisterEntryMovementController', RegisterEntryMovementController)
  .register<RegisterOutputMovementUseCase>('RegisterOutputMovementUseCase', RegisterOutputMovementUseCase)
  .register<RegisterOutputMovementController>('RegisterOutputMovementController', RegisterOutputMovementController)
  .register<GetAllMovementsUseCase>('GetAllMovementsUseCase', GetAllMovementsUseCase)
  .register<GetAllMovementsController>('GetAllMovementsController', GetAllMovementsController);

export { container };
