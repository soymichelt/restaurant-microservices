import { container } from '@di/services/movements';
import middy from '@middy/core';
import { RegisterOutputMovementController } from '@services/movements/infrastructure/functions/sqs/registerOutput/controller';
import { Context, SQSEvent } from 'aws-lambda';

const invokeController = async function (event: SQSEvent, context: Context) {
  const controller = container.resolve<RegisterOutputMovementController>('RegisterOutputMovementController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
