import { container } from '@di/services/orders';
import middy from '@middy/core';
import { UpdateOrderStateController } from '@services/orders/infrastructure/functions/http/updateState/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<UpdateOrderStateController>('UpdateOrderStateController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
