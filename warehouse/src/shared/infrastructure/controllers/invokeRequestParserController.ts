/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestParserController } from '@shared/infrastructure/controllers/requestParserController';
import { Context } from 'aws-lambda';
import { injectable } from 'tsyringe';

@injectable()
export class InvokeRequestParserController implements RequestParserController {
  public match(_: any, context: Context): boolean {
    return context.functionName.includes('-invoke');
  }

  public parseRequest<T>(event: any): T {
    if (!event.body) {
      return typeof event === 'string' ? (JSON.stringify(event) as T) : (event as T);
    }

    return typeof event.body === 'string' ? (JSON.stringify(event.body) as T) : (event.body as T);
  }
}
