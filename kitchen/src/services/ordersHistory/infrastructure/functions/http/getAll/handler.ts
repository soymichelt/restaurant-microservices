import { container } from '@di/services/ordersHistory';
import middy from '@middy/core';
import { GetAllOrdersHistoryController } from '@services/ordersHistory/infrastructure/functions/http/getAll/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<GetAllOrdersHistoryController>('GetAllOrdersHistoryController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
