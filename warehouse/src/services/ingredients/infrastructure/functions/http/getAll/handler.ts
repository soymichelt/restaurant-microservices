import { container } from '@di/services/ingredients';
import middy from '@middy/core';
import { GetAllIngredientsController } from '@services/ingredients/infrastructure/functions/http/getAll/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<GetAllIngredientsController>('GetAllIngredientsController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
