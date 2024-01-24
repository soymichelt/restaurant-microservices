import { OrderStockResponse } from '@services/ingredients/application/responses/orderStockResponse';
import { OrderIngredientStockRequest } from '@services/ingredients/application/useCases/orderStock/orderIngredientStockRequest';
import { Ingredient } from '@services/ingredients/domain/ingredient';
import { IngredientRepository } from '@services/ingredients/domain/repositories/ingredientRepository';
import { MarketplaceService } from '@services/ingredients/domain/services/marketplaceService';
import { IngredientId } from '@services/ingredients/domain/valueObjects/ingredientId';
import { EventBus } from '@shared/domain/events/eventBus';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class OrderIngredientStockUseCase extends UseCase<OrderIngredientStockRequest, OrderStockResponse> {
  constructor(
    @inject('IngredientRepository') private repository: IngredientRepository,
    @inject('MarketplaceService') private marketPlaceService: MarketplaceService,
    @inject('EventBus') private eventBus: EventBus,
  ) {
    super();
  }

  public async run(request: OrderIngredientStockRequest): Promise<OrderStockResponse> {
    const { ingredients: orders } = request;
    const ingredientIds = orders.map(({ ingredientId }) => IngredientId.build(ingredientId));

    const ingredients = await this.repository.all(ingredientIds);
    if (!ingredients?.length) {
      return {
        message: 'Ingredients list is empty',
        orderDelivered: false,
      };
    }

    const existingIngredients: Ingredient[] = this.getExisting(ingredients, request);
    let missingIngredients: Ingredient[] = this.getMissing(ingredients, request);

    if (!missingIngredients.length) {
      this.decreaseStock(existingIngredients, request);
      await this.deliverIngredients(existingIngredients);
      return {
        message: 'Success 🍻🍻🍻',
        orderDelivered: true,
      };
    }

    await this.buyIngredients(missingIngredients);

    missingIngredients = this.getMissing(missingIngredients, request);
    if (missingIngredients.length > 0) {
      return {
        message: 'There are missing ingredients',
        orderDelivered: false,
      };
    }

    this.decreaseStock(existingIngredients, request);
    await this.deliverIngredients(existingIngredients);

    this.decreaseStock(missingIngredients, request);
    await this.deliverIngredients(missingIngredients);

    return {
      message: 'Success 🍻🍻🍻',
      orderDelivered: true,
    };
  }

  private getExisting(ingredients: Ingredient[], request: OrderIngredientStockRequest): Ingredient[] {
    const { ingredients: orders } = request;

    return ingredients.filter((ingredient) => {
      const order = orders.find(({ ingredientId }) => ingredient.ingredientId.value === ingredientId);
      if (!order) return;

      return ingredient.stock.value - order.quantity >= 0;
    });
  }

  private getMissing(ingredients: Ingredient[], request: OrderIngredientStockRequest): Ingredient[] {
    const { ingredients: orders } = request;

    return ingredients.filter((ingredient) => {
      const order = orders.find(({ ingredientId }) => ingredient.ingredientId.value === ingredientId);
      if (!order) return;

      return ingredient.stock.value - order.quantity < 0;
    });
  }

  private decreaseStock(ingredients: Ingredient[], request: OrderIngredientStockRequest): void {
    const { ingredients: orders } = request;

    ingredients.forEach((ingredient) => {
      const order = orders.find(({ ingredientId }) => ingredient.ingredientId.value === ingredientId);
      if (!order) return;

      ingredient.removeFromStock(order.quantity);
    });
  }

  private async buyIngredients(ingredients: Ingredient[]): Promise<void> {
    const promises = ingredients.map(async (ingredient) => {
      const quantitySold = await this.marketPlaceService.buy(ingredient.name);
      ingredient.addToStock(quantitySold);

      await this.applyUpdates(ingredient);
    });

    await Promise.all(promises);
  }

  private async deliverIngredients(ingredients: Ingredient[]): Promise<void> {
    const promises = ingredients.map(async (ingredient) => {
      await this.applyUpdates(ingredient);
    });

    await Promise.all(promises);
  }

  private async applyUpdates(ingredient: Ingredient): Promise<void> {
    await this.repository.update(ingredient);
    await this.eventBus.publish(ingredient.pullEvents());
  }
}
