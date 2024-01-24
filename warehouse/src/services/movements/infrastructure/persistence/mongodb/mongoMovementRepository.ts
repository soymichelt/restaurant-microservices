import { IngredientId } from '@services/ingredients/domain/valueObjects/ingredientId';
import { Movement } from '@services/movements/domain/movement';
import { MovementRepository } from '@services/movements/domain/repositories/movementRepository';
import { MongoRepository } from '@shared/infrastructure/persistence/mongodb/mongoRepository';
import { injectable } from 'tsyringe';

const MOVEMENT_COLLECTION = 'movements';

@injectable()
export class MongoMovementRepository extends MongoRepository<Movement> implements MovementRepository {
  constructor() {
    super({ collectionName: MOVEMENT_COLLECTION });
  }

  public async all(ingredientId: IngredientId): Promise<Movement[]> {
    const collection = await this.collection();
    const documents = await collection.find({ ingredientId: ingredientId.value }).toArray();
    if (!documents.length) return [];

    return documents.map((document) => this.mapToMovement(document));
  }

  public async update(movement: Movement): Promise<void> {
    await this.persist(movement.movementId, movement);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapToMovement(document: any): Movement {
    return Movement.fromPrimitives({
      movementId: document.movementId,
      movementNumber: document.movementNumber,
      type: document.type,
      concept: document.concept,
      quantity: document.quantity,
      stock: document.stock,
      ingredientId: document.ingredientId,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
