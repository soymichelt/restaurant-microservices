/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgRequiredException } from '@shared/domain/exceptions/argRequiredException';
import { TokenHasExpiredException } from '@shared/domain/exceptions/tokenHasExpiredException';
import { UserTokenDecodeException } from '@shared/domain/exceptions/userTokenDecodeException';
import { UserTokenEncodeException } from '@shared/domain/exceptions/userTokenEncodeException';
import { UserPayloadProps, UserTokenService } from '@shared/domain/services/userTokenService';
import * as jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

export type JwtUserTokenServiceProps = {
  privateKey: string;
};

@injectable()
export class JwtUserTokenService implements UserTokenService {
  private privateKey: string;

  constructor(props: JwtUserTokenServiceProps) {
    this.validateJwtUserTokenService(props);

    this.privateKey = props.privateKey;
  }

  public async encode(payload: UserPayloadProps): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      const expiration = 60 * 5; // 5 minutos

      jwt.sign(
        {
          payload,
        },
        this.privateKey,
        {
          algorithm: 'RS256',
          expiresIn: expiration,
        },
        (error: Error, token: string) => {
          if (error) {
            reject(new UserTokenEncodeException(error));
          }

          resolve(token);
        },
      );
    });

    return promise;
  }

  public async verifyAndDecode(token: string): Promise<UserPayloadProps> {
    const promise = new Promise<UserPayloadProps>((resolve, reject) => {
      jwt.verify(token, this.privateKey, (error: Error, result: any) => {
        if (error) {
          reject(new UserTokenDecodeException(error));
        }

        if (this.verifyIfTokenHasExpired(result.exp)) {
          reject(new TokenHasExpiredException(result.payload?.userId));
        }

        return resolve(result.payload as UserPayloadProps);
      });
    });

    return promise;
  }

  private verifyIfTokenHasExpired(exp: number): boolean {
    const expirationDate = new Date(exp * 1000);
    const currentDate = new Date();

    return currentDate > expirationDate;
  }

  private validateJwtUserTokenService(props: JwtUserTokenServiceProps): void {
    if (!props.privateKey?.trim()) {
      throw new ArgRequiredException('privateKey');
    }
  }
}
