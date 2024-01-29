import 'reflect-metadata';

import { EventBus } from '@shared/domain/events/eventBus';
import { Logger } from '@shared/domain/loggers/logger';
import { KeyStoreService } from '@shared/domain/services/keyStoreService';
import { AuthorizerRequestParserController } from '@shared/infrastructure/controllers/authorizerRequestParserController';
import { HttpRequestParserController } from '@shared/infrastructure/controllers/httpRequestParserController';
import { ManagerRequestParsersController } from '@shared/infrastructure/controllers/managerRequestParsersController';
import { RequestParserController } from '@shared/infrastructure/controllers/requestParserController';
import { ScheduleRequestParserController } from '@shared/infrastructure/controllers/scheduleRequestParserController';
import { SnsRequestParserController } from '@shared/infrastructure/controllers/snsRequestParserController';
import { SqsRequestParserController } from '@shared/infrastructure/controllers/sqsRequestParserController';
import { EventBusSns } from '@shared/infrastructure/events/eventBusSns';
import { EventBusSqs } from '@shared/infrastructure/events/eventBusSqs';
import { WinstonLogger } from '@shared/infrastructure/loggers/winston/winstonLogger';
import { MongoClientFactory } from '@shared/infrastructure/persistence/mongodb/mongoClientFactory';
import { SsmKeyStoreService } from '@shared/infrastructure/services/keyStore/ssmKeyStoreService';
import { LambdaInvokeService } from '@shared/infrastructure/services/lambda/lambdaInvokeService';
import { container } from 'tsyringe';

container
  .register<RequestParserController>('RequestParserController', HttpRequestParserController)
  .register<RequestParserController>('RequestParserController', AuthorizerRequestParserController)
  .register<RequestParserController>('RequestParserController', SnsRequestParserController)
  .register<RequestParserController>('RequestParserController', SqsRequestParserController)
  .register<RequestParserController>('RequestParserController', ScheduleRequestParserController)
  .register<ManagerRequestParsersController>('ManagerRequestParsersController', ManagerRequestParsersController)
  .register<Logger>('Logger', {
    useValue: new WinstonLogger({
      app: process.env.APP,
      service: process.env.SERVICE,
      package: process.env.PACKAGE,
      awsRegion: process.env.REGION,
      stage: process.env.STAGE,
      version: process.env.VERSION,
    }),
  })
  .register<KeyStoreService>('KeyStoreService', {
    useValue: new SsmKeyStoreService({
      awsRegion: process.env.REGION,
    }),
  })
  .register<LambdaInvokeService>('LambdaInvokeService', LambdaInvokeService);

if (process.env.SNS_TOPIC_ARN) {
  container.register<EventBus>('EventBus', {
    useValue: new EventBusSns({
      serviceName: `${process.env.APP}.${process.env.SERVICE}`,
      version: process.env.EVENT_BUS_VERSION,
      awsRegion: process.env.REGION,
      topicArn: process.env.SNS_TOPIC_ARN,
    }),
  });
}

if (process.env.SQS_URL) {
  container.register<EventBus>('EventBusQueue', {
    useValue: new EventBusSqs({
      serviceName: `${process.env.APP}.${process.env.SERVICE}`,
      version: process.env.EVENT_BUS_VERSION,
      awsRegion: process.env.REGION,
      queueUrl: process.env.SQS_URL,
    }),
  });
}

if (process.env.MONGO_DATABASE_URI && process.env.MONGO_DATABASE_NAME) {
  container.register<MongoClientFactory>('MongoClientFactory', {
    useValue: MongoClientFactory.build({
      uri: process.env.MONGO_DATABASE_URI,
      databaseName: process.env.MONGO_DATABASE_NAME,
    }),
  });
}

export { container };
