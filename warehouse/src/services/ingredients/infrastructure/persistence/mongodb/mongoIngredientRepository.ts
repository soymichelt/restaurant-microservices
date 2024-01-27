import { Ingredient } from '@services/ingredients/domain/ingredient';
import { IngredientRepository } from '@services/ingredients/domain/repositories/ingredientRepository';
import { IngredientId } from '@services/ingredients/domain/valueObjects/ingredientId';
import { MongoRepository } from '@shared/infrastructure/persistence/mongodb/mongoRepository';
import { injectable } from 'tsyringe';

const INGREDIENT_COLLECTION = 'ingredients';

@injectable()
export class MongoIngredientRepository extends MongoRepository<Ingredient> implements IngredientRepository {
  constructor() {
    super({ collectionName: INGREDIENT_COLLECTION });
  }

  public async all(ingredientIds?: IngredientId[]): Promise<Ingredient[]> {
    const collection = await this.collection();
    const filter = ingredientIds ? { _id: { $in: ingredientIds.map((ingredientId) => ingredientId.value) } } : {};

    const documents = await collection.find(filter).toArray();
    if (!documents?.length) return [];

    return documents.map((document) => this.mapToIngredient(document));
  }

  public async find(ingredientId: IngredientId): Promise<Ingredient> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: ingredientId.value });
    if (!document) return;

    return this.mapToIngredient(document);
  }

  public async update(ingredient: Ingredient): Promise<void> {
    await this.persist(ingredient.ingredientId, ingredient);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToIngredient(document: any): Ingredient {
    return Ingredient.fromPrimitives({
      ingredientId: document.ingredientId,
      name: document.name,
      stock: document.stock,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
