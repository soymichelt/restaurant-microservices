import { Recipe } from '@services/recipes/domain/recipe';
import { RecipeRepository } from '@services/recipes/domain/repositories/recipeRepository';
import { RecipeId } from '@shared/domain/valueObjects/recipeId';
import { MongoRepository } from '@shared/infrastructure/persistence/mongodb/mongoRepository';
import { injectable } from 'tsyringe';

const RECIPE_COLLECTION = 'recipes';

@injectable()
export class MongoRecipeRepository extends MongoRepository<Recipe> implements RecipeRepository {
  constructor() {
    super({ collectionName: RECIPE_COLLECTION });
  }

  public async all(recipeIds?: RecipeId[]): Promise<Recipe[]> {
    const collection = await this.collection();
    const filter = !recipeIds ? {} : { _id: { $in: recipeIds.map((recipeId) => recipeId.value) } };

    const documents = await collection.find(filter).toArray();
    if (!documents || !documents.length) return [];

    return documents.map((document) => this.mapToRecipe(document));
  }

  public async find(recipeId: RecipeId): Promise<Recipe> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: recipeId.value });
    if (!document) return;

    return this.mapToRecipe(document);
  }

  public async findRand(): Promise<Recipe> {
    const collection = await this.collection();
    const randomDocuments = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
    const document = randomDocuments?.[0];
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
      ingredients: document.ingredients,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
