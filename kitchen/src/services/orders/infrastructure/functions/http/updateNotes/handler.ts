import { container } from '@di/services/orders';
import middy from '@middy/core';
import { UpdateOrderNotesController } from '@services/orders/infrastructure/functions/http/updateNotes/controller';
import { APIGatewayProxyCallbackV2, Context } from 'aws-lambda';

const invokeController = async function (event: APIGatewayProxyCallbackV2, context: Context) {
  const controller = container.resolve<UpdateOrderNotesController>('UpdateOrderNotesController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
