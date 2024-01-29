import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class TokenHasExpiredException extends DomainException {
  constructor(userId: string) {
    super({
      name: StringValueObject.build('TokenHasExpiredException'),
      message: StringValueObject.build(`Token has expired`),
      status: IntegerValueObject.build(400),
      code: StringValueObject.build(ERROR_CODES['TokenHasExpiredException']),
      errorType: ErrorType.error(),
      metadata: { userId },
    });
  }
}
