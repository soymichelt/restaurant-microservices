import { container } from '@di/services/orders';
import middy from '@middy/core';
import { CreateOrderController } from '@services/orders/infrastructure/functions/http/create/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<CreateOrderController>('CreateOrderController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
