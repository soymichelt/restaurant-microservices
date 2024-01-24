import { container } from '@di/services/ingredients';
import middy from '@middy/core';
import { OrderIngredientStockController } from '@services/ingredients/infrastructure/functions/http/orderStock/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<OrderIngredientStockController>('OrderIngredientStockController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
