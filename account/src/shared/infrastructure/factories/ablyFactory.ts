import * as Ably from 'ably';

export class AblyClientFactory {
  private static ablyApp: Ably.Types.RealtimePromise;

  public static getApp(apiKey: string): Ably.Types.RealtimePromise {
    if (this.ablyApp) {
      return AblyClientFactory.ablyApp;
    }

    const newApp = new Ably.Realtime.Promise(apiKey);
    this.ablyApp = newApp;
    return this.ablyApp;
  }
}
