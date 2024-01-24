import { container } from '@di/services/movements';
import middy from '@middy/core';
import { RegisterEntryMovementController } from '@services/movements/infrastructure/functions/sqs/registerEntry/controller';
import { Context, SQSEvent } from 'aws-lambda';

const invokeController = async function (event: SQSEvent, context: Context) {
  const controller = container.resolve<RegisterEntryMovementController>('RegisterEntryMovementController');
  return await controller.execute(event, context);
};

export const handler = middy(invokeController);
