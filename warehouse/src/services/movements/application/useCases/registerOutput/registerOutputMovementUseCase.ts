import { IngredientId } from '@services/ingredients/domain/valueObjects/ingredientId';
import { MovementResponse } from '@services/movements/application/responses/movementResponse';
import { RegisterOutputMovementRequest } from '@services/movements/application/useCases/registerOutput/registerOutputMovementRequest';
import { Movement } from '@services/movements/domain/movement';
import { MovementRepository } from '@services/movements/domain/repositories/movementRepository';
import { MovementConcept } from '@services/movements/domain/valueObjects/movementConcept';
import { MovementId } from '@services/movements/domain/valueObjects/movementId';
import { MovementNumber } from '@services/movements/domain/valueObjects/movementNumber';
import { MovementQuantity } from '@services/movements/domain/valueObjects/movementQuantity';
import { MovementStock } from '@services/movements/domain/valueObjects/movementStock';
import { MovementType } from '@services/movements/domain/valueObjects/movementType';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RegisterOutputMovementUseCase extends UseCase<RegisterOutputMovementRequest, MovementResponse> {
  constructor(@inject('MovementRepository') private repository: MovementRepository) {
    super();
  }

  public async run(request: RegisterOutputMovementRequest): Promise<MovementResponse> {
    const movement = Movement.build({
      movementId: MovementId.newId(),
      movementNumber: MovementNumber.default(),
      type: MovementType.output(),
      concept: MovementConcept.build('REGISTRO DE SALIDA'),
      quantity: MovementQuantity.build(request.ingredientStockDecremented),
      stock: MovementStock.build(request.ingredientStock),
      ingredientId: IngredientId.build(request.ingredientId),
    });

    await this.repository.update(movement);

    return movement.toPrimitives();
  }
}
