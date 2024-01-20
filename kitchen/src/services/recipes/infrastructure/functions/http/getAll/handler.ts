import { container } from '@di/services/recipes';
import middy from '@middy/core';
import { GetAllRecipesController } from '@services/recipes/infrastructure/functions/http/getAll/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<GetAllRecipesController>('GetAllRecipesController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
