import { UserId } from '@services/users/domain/valueObjects/userId';

export interface GetIdentityService {
  getIdentity(userId: UserId): Promise<Record<string, string | number>>;
}
