import { RecipeResponse } from '@services/recipes/application/responses/recipeResponse';
import { RecipeRepository } from '@services/recipes/domain/repositories/recipeRepository';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllRecipesUseCase extends UseCase<void, RecipeResponse[]> {
  constructor(@inject('RecipeRepository') private repository: RecipeRepository) {
    super();
  }

  public async run(): Promise<RecipeResponse[]> {
    const recipes = await this.repository.all();
    return recipes.map((recipe) => recipe.toPrimitives());
  }
}
