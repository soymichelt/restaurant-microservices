import { OrderRecipeResponse } from '@services/orders/application/responses/orderRecipeResponse';
import { GetAllOrdersRequest } from '@services/orders/application/useCases/getAll/getAllOrdersRequest';
import { Order } from '@services/orders/domain/order';
import { OrderRepository } from '@services/orders/domain/repositories/orderRepository';
import { RecipeRepository } from '@services/recipes/domain/repositories/recipeRepository';
import { UseCase } from '@shared/domain/useCases/useCase';
import { DateRange } from '@shared/domain/valueObjects/dateRangeValueObject';
import { RecipeId } from '@shared/domain/valueObjects/recipeId';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllOrdersUseCase extends UseCase<GetAllOrdersRequest, OrderRecipeResponse[]> {
  constructor(
    @inject('OrderRepository') private orderRepository: OrderRepository,
    @inject('RecipeRepository') private recipeRepository: RecipeRepository,
  ) {
    super();
  }

  public async run(request: GetAllOrdersRequest): Promise<OrderRecipeResponse[]> {
    const range = request.range ? DateRange.fromString(request.range) : undefined;
    const orders = await this.orderRepository.all(undefined, range);
    if (!orders?.length) return [];

    const recipeIds = this.getRecipeIds(orders);
    const recipes = await this.recipeRepository.all(recipeIds);

    return orders.map((order): OrderRecipeResponse => {
      const recipe = recipes.find(({ recipeId }) => recipeId.equals(order.recipeId));
      if (!recipe) return order.toPrimitives();

      const orderPrimitives = order.toPrimitives();
      const recipePrimitives = recipe.toPrimitives();
      return {
        ...orderPrimitives,
        recipeName: recipePrimitives.name,
        recipeDescription: recipePrimitives.description,
        recipePreparationMethod: recipePrimitives.preparationMethod,
      };
    });
  }

  private getRecipeIds(orders: Order[]): RecipeId[] {
    if (!orders.length) return [];

    const recipeIds = orders
      .map((order) => order.recipeId)
      .reduce((result: RecipeId[], currentRecipeId: RecipeId) => {
        const recipeIdExist = result.find((recipeId) => recipeId.equals(currentRecipeId));
        if (recipeIdExist) return result;

        result.push(currentRecipeId);
        return result;
      }, []);

    return recipeIds;
  }
}
