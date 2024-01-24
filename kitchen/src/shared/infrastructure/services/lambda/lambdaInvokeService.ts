import { InvokeCommand, LambdaClient, LogType } from '@aws-sdk/client-lambda';

export type LambdaInvocationOptions = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Record<string, any>;
  logType?: LogType;
};

export class LambdaInvokeService {
  private client: LambdaClient;

  constructor() {
    this.client = new LambdaClient();
  }

  public async invoke<T>(options: LambdaInvocationOptions): Promise<T> {
    const command = new InvokeCommand({
      FunctionName: options.name,
      Payload: typeof options.payload === 'string' ? options.payload : JSON.stringify(options.payload),
      LogType: options.logType ?? LogType.Tail,
      InvocationType: 'RequestResponse',
    });

    const result = await this.client.send(command);
    if (!result.Payload) return;

    const payload = Buffer.from(result.Payload).toString();
    const payloadParsed = JSON.parse(payload);

    if (payloadParsed.body) {
      return typeof payloadParsed.body === 'string' ? (JSON.parse(payloadParsed.body) as T) : (payloadParsed.body as T);
    }

    return payloadParsed as T;
  }
}
