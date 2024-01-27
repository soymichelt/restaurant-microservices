import { IngredientResponse } from '@services/ingredients/application/responses/ingredientResponse';
import { GetIngredientRequest } from '@services/ingredients/application/useCases/get/getIngredientRequest';
import { IngredientNotFoundException } from '@services/ingredients/domain/exceptions/ingredientNotFoundException';
import { IngredientRepository } from '@services/ingredients/domain/repositories/ingredientRepository';
import { IngredientId } from '@services/ingredients/domain/valueObjects/ingredientId';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetIngredientUseCase extends UseCase<GetIngredientRequest, IngredientResponse> {
  constructor(@inject('IngredientRepository') private repository: IngredientRepository) {
    super();
  }

  public async run(request: GetIngredientRequest): Promise<IngredientResponse> {
    const ingredientId = IngredientId.build(request.ingredientId);
    const ingredient = await this.repository.find(ingredientId);
    if (!ingredient) {
      throw new IngredientNotFoundException(ingredientId);
    }

    return ingredient.toPrimitives();
  }
}
