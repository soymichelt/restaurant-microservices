import { RecipeResponse } from '@services/recipes/application/responses/recipeResponse';
import { GetAllRecipesUseCase } from '@services/recipes/application/useCases/getAll/getAllRecipesUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllRecipesController extends BaseController<void, RecipeResponse[]> {
  constructor(@inject('GetAllRecipesUseCase') private useCase: GetAllRecipesUseCase) {
    super();
  }

  public async run(): Promise<RecipeResponse[]> {
    const result = await this.useCase.run();
    return result;
  }
}
