import { container } from '@di/services/users';
import middy from '@middy/core';
import { SignupUserController } from '@services/users/infrastructure/functions/http/signup/controller';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyEventV2, context: Context) {
  const controller = container.resolve<SignupUserController>('SignupUserController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
