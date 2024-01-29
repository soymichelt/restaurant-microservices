import { container } from '@di/services/orders';
import middy from '@middy/core';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

import { CheckOrdersController } from './controller';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<CheckOrdersController>('CheckOrdersController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
