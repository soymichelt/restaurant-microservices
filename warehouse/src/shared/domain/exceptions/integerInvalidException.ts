import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class IntegerInvalidException extends DomainException {
  constructor(value: number) {
    super({
      name: StringValueObject.build('IntegerInvalidException'),
      message: StringValueObject.build('This value is not a integer valid'),
      status: IntegerValueObject.build(500),
      code: StringValueObject.build(ERROR_CODES['IntegerInvalidException']),
      errorType: ErrorType.error(),
      metadata: { value },
    });
  }
}
