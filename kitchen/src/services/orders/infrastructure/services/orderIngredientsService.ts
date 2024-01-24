import { OrderIngredientsService } from '@services/orders/domain/services/orderIngredientsService';
import { ArgRequiredException } from '@shared/domain/exceptions/argRequiredException';
import { Logger } from '@shared/domain/loggers/logger';
import { LambdaInvokeService } from '@shared/infrastructure/services/lambda/lambdaInvokeService';
import { inject, injectable } from 'tsyringe';

type OrderStockResponse = {
  message: string;
  orderDelivered: boolean;
};

type IngredientsToRequest = {
  ingredientId: string;
  quantity: number;
};

@injectable()
export class OrderIngredientsServiceImplemented implements OrderIngredientsService {
  private orderIngredientsLambdaArn: string;

  constructor(
    @inject('Logger') private logger: Logger,
    @inject('LambdaInvokeService') private lambdaService: LambdaInvokeService,
  ) {
    this.prepareService();
  }

  public async orderIngredients(ingredients: IngredientsToRequest[]): Promise<boolean> {
    try {
      const result = await this.lambdaService.invoke<OrderStockResponse>({
        name: this.orderIngredientsLambdaArn,
        payload: {
          ingredients,
        },
      });

      if (!result.orderDelivered) {
        this.logger.error({
          message: 'orderIngredients failed >>> ',
          result: { ...result },
          type: typeof result,
        });
      }

      return result.orderDelivered;
    } catch (error) {
      this.logger.error({
        message: 'OrderIngredients request failed >>>>> ',
        errorMessage: error.message,
        stack: error.stack,
        error,
      });

      return false;
    }
  }

  private prepareService(): void {
    this.orderIngredientsLambdaArn = process.env.LAMBDA_ORDER_INGREDIENTS_STOCK || '';

    if (!this.orderIngredientsLambdaArn.trim()) {
      throw new ArgRequiredException('LAMBDA_ORDER_INGREDIENTS_STOCK');
    }
  }
}
