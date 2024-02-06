import { UserId } from '@services/users/domain/valueObjects/userId';
import { ArgRequiredException } from '@shared/domain/exceptions/argRequiredException';
import { GetIdentityService } from '@shared/domain/services/getIdentityService';
import { AblyClientFactory } from '@shared/infrastructure/factories/ablyFactory';
import * as Ably from 'ably';
import { injectable } from 'tsyringe';

type GetIdentityServiceAblyProps = {
  apiKey: string;
};

@injectable()
export class GetIdentityServiceAbly implements GetIdentityService {
  private ablyApp: Ably.Types.RealtimePromise;

  constructor(props: GetIdentityServiceAblyProps) {
    this.validateService(props);

    this.ablyApp = AblyClientFactory.getApp(props.apiKey);
  }

  public async getIdentity(userId: UserId): Promise<Record<string, string | number>> {
    const result = await this.ablyApp.auth.createTokenRequest({
      clientId: userId.toString(),
    });

    return { ...result };
  }

  private validateService(props: GetIdentityServiceAblyProps): void {
    if (!props.apiKey) {
      throw new ArgRequiredException('apiKey');
    }
  }
}
