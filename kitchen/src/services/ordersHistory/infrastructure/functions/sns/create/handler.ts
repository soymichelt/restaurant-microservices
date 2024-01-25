import { container } from '@di/services/ordersHistory';
import middy from '@middy/core';
import { CreateOrderHistoryController } from '@services/ordersHistory/infrastructure/functions/sns/create/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<CreateOrderHistoryController>('CreateOrderHistoryController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
