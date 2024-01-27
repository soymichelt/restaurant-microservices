import { IngredientResponse } from '@services/ingredients/application/responses/ingredientResponse';
import { GetIngredientRequest } from '@services/ingredients/application/useCases/get/getIngredientRequest';
import { GetIngredientUseCase } from '@services/ingredients/application/useCases/get/getIngredientUseCase';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetIngredientController extends BaseController<GetIngredientRequest, IngredientResponse> {
  constructor(@inject('GetIngredientUseCase') private useCase: GetIngredientUseCase) {
    super();
  }

  public async run(request: GetIngredientRequest): Promise<IngredientResponse> {
    const result = await this.useCase.run(request);
    return result;
  }
}
