import { container } from '@di/services/ingredients';
import middy from '@middy/core';
import { GetIngredientController } from '@services/ingredients/infrastructure/functions/http/get/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<GetIngredientController>('GetIngredientController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
