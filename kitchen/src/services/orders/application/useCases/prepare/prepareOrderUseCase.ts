/* eslint-disable max-lines-per-function */
import { PrepareOrderRequest } from '@services/orders/application/useCases/prepare/prepareOrderRequest';
import { OrderNotFoundException } from '@services/orders/domain/exceptions/orderNotFoundException';
import { RecipeNotFoundException } from '@services/orders/domain/exceptions/recipeNotFoundException';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { OrderIngredientsService } from '@services/orders/domain/services/orderIngredientsService';
import { OrderId } from '@services/orders/domain/valueObjects/orderId';
import { RecipeRepository } from '@services/recipes/domain/repositories/recipeRepository';
import { EventBus } from '@shared/domain/events/eventBus';
import { UseCase } from '@shared/domain/useCases/useCase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PrepareOrderUseCase extends UseCase<PrepareOrderRequest, void> {
  constructor(
    @inject('OrderRepository') private repository: OrderRepository,
    @inject('RecipeRepository') private recipeRepository: RecipeRepository,
    @inject('OrderIngredientsService') private service: OrderIngredientsService,
    @inject('EventBus') private eventBus: EventBus,
  ) {
    super();
  }

  public async run(request: PrepareOrderRequest): Promise<void> {
    const orderId = OrderId.build(request.orderId);

    const order = await this.repository.find(orderId);
    if (!order) {
      throw new OrderNotFoundException(orderId);
    }

    const recipe = await this.recipeRepository.find(order.recipeId);
    if (!recipe) {
      throw new RecipeNotFoundException(order.recipeId.value);
    }

    const ingredients = recipe.ingredients.map((ingredient) => ingredient.toPrimitives());

    const orderIsDelivered = await this.service.orderIngredients(ingredients);
    if (!orderIsDelivered) {
      order.requestOrderAgain();
      await this.eventBus.publish(order.pullEvents());
      return;
    }

    order.markAsInProgress();

    await this.repository.update(order);
  }
}
