import { IngredientResponse } from '@services/ingredients/application/responses/ingredientResponse';
import { GetAllIngredientsUseCase } from '@services/ingredients/application/useCases/getAll/getAllIngredientsUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllIngredientsController extends BaseController<void, IngredientResponse[]> {
  constructor(@inject('GetAllIngredientsUseCase') private useCase: GetAllIngredientsUseCase) {
    super();
  }

  public async run(): Promise<IngredientResponse[]> {
    const result = await this.useCase.run();

    return result;
  }
}
