import { Recipe } from '@services/recipes/domain/recipe';
import { RecipeRepository } from '@services/recipes/domain/repositories/recipeRepository';
import { RecipeId } from '@services/recipes/domain/valueObjects/recipeId';
import { MongoRepository } from '@shared/infrastructure/persistence/mongodb/mongoRepository';
import { injectable } from 'tsyringe';

const RECIPE_COLLECTION = 'recipes';

@injectable()
export class MongoRecipeRepository extends MongoRepository<Recipe> implements RecipeRepository {
  constructor() {
    super({ collectionName: RECIPE_COLLECTION });
  }

  public async all(): Promise<Recipe[]> {
    const collection = await this.collection();
    const documents = await collection.find({}).toArray();
    if (!documents || !documents.length) return [];

    return documents.map((document) => this.mapToRecipe(document));
  }

  public async find(recipeId: RecipeId): Promise<Recipe> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: recipeId.value });
    if (!document) return;

    return this.mapToRecipe(document);
  }

  public async update(recipe: Recipe): Promise<void> {
    await this.persist(recipe.recipeId, recipe);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToRecipe(document: any): Recipe {
    return Recipe.fromPrimitives({
      recipeId: document.recipeId,
      name: document.name,
      description: document.description,
      preparationMethod: document.preparationMethod,
    });
  }
}
