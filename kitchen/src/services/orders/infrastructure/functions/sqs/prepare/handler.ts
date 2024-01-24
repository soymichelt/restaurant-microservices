import { container } from '@di/services/orders';
import middy from '@middy/core';
import { PrepareOrderController } from '@services/orders/infrastructure/functions/sqs/prepare/controller';
import { Context, SQSEvent } from 'aws-lambda';

const invokeController = async function (event: SQSEvent, context: Context) {
  const controller = container.resolve<PrepareOrderController>('PrepareOrderController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
