/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestParserController } from '@shared/infrastructure/controllers/requestParserController';
import { Context, ScheduledEvent } from 'aws-lambda';
import { injectable } from 'tsyringe';

@injectable()
export class ScheduleRequestParserController implements RequestParserController {
  public match(event: ScheduledEvent, _context: Context): boolean {
    return event.source === 'aws.events';
  }

  public parseRequest<T>(event: ScheduledEvent, _context: Context): T {
    return {
      ...(typeof event.detail === 'string' ? JSON.parse(event.detail) : event.detail),
    } as T;
  }
}
