import { IngredientResponse } from '@services/ingredients/application/responses/ingredientResponse';
import { IngredientRepository } from '@services/ingredients/domain/repositories/ingredientRepository';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllIngredientsUseCase extends UseCase<void, IngredientResponse[]> {
  constructor(@inject('IngredientRepository') private repository: IngredientRepository) {
    super();
  }

  public async run(): Promise<IngredientResponse[]> {
    const ingredients = await this.repository.all();

    return ingredients.map((ingredient) => ingredient.toPrimitives());
  }
}
