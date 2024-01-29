import { container } from '@di/services/users';
import middy from '@middy/core';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

import { RefreshUserTokenController } from './controller';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<RefreshUserTokenController>('RefreshUserTokenController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
