import { container } from '@di/services/users';
import middy from '@middy/core';
import { GetIdentityController } from '@services/users/infrastructure/functions/http/getIdentity/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<GetIdentityController>('GetIdentityController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
