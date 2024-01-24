import { container } from '@di/services/movements';
import middy from '@middy/core';
import { GetAllMovementsController } from '@services/movements/infrastructure/functions/http/getAll/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<GetAllMovementsController>('GetAllMovementsController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
