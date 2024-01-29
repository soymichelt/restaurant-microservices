import { container } from '@di/services/users';
import middy from '@middy/core';
import { VerifyIfAuthorizedController } from '@services/users/infrastructure/functions/authorizer/verifyUser/controller';
import { APIGatewayRequestAuthorizerEvent, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayRequestAuthorizerEvent, context: Context) {
  const controller = container.resolve<VerifyIfAuthorizedController>('VerifyIfAuthorizedController');
  const result = await controller.execute(event, context);
  return result;
};

export const handler = middy(invokeController);
