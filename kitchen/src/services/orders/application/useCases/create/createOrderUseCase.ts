import { OrderResponse } from '@services/orders/application/responses/orderResponse';
import { RecipeNotFoundException } from '@services/orders/domain/exceptions/recipeNotFoundException';
import { Order } from '@services/orders/domain/order';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { RecipeRepository } from '@services/recipes/domain/repositories/recipeRepository';
import { EventBus } from '@shared/domain/events/eventBus';
import { UseCase } from '@shared/domain/useCases/useCase';
import { OrderId } from '@shared/domain/valueObjects/orderId';
import { OrderState } from '@shared/domain/valueObjects/orderState';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateOrderUseCase extends UseCase<void, OrderResponse> {
  constructor(
    @inject('OrderRepository') private orderRepository: OrderRepository,
    @inject('RecipeRepository') private recipeRepository: RecipeRepository,
    @inject('EventBus') private eventBus: EventBus,
  ) {
    super();
  }

  public async run(): Promise<OrderResponse> {
    const recipe = await this.recipeRepository.findRand();
    if (!recipe) {
      throw new RecipeNotFoundException();
    }

    const order = Order.create({
      orderId: OrderId.newId(),
      recipeId: recipe.recipeId,
      state: OrderState.todo(),
    });

    await this.orderRepository.update(order);
    await this.eventBus.publish(order.pullEvents());
    return order.toPrimitives();
  }
}
