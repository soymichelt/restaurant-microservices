import { IngredientId } from '@services/ingredients/domain/valueObjects/ingredientId';
import { MovementResponse } from '@services/movements/application/responses/movementResponse';
import { GetAllMovementsRequest } from '@services/movements/application/useCases/getAll/getAllMovementsRequest';
import { MovementRepository } from '@services/movements/domain/repositories/movementRepository';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllMovementsUseCase extends UseCase<GetAllMovementsRequest, MovementResponse[]> {
  constructor(@inject('MovementRepository') private repository: MovementRepository) {
    super();
  }

  public async run(request: GetAllMovementsRequest): Promise<MovementResponse[]> {
    const ingredientId = IngredientId.build(request.ingredientId);
    const movements = await this.repository.all(ingredientId);
    return movements.map((movement) => movement.toPrimitives());
  }
}
