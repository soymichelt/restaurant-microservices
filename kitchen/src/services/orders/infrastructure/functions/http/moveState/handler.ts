import { container } from '@di/services/orders';
import middy from '@middy/core';
import { MoveToNextOrderStateController } from '@services/orders/infrastructure/functions/http/moveState/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<MoveToNextOrderStateController>('MoveToNextOrderStateController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
