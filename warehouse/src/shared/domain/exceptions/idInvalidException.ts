import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class IdInvalidException extends DomainException {
  constructor(value: string) {
    super({
      name: StringValueObject.build('IdInvalidException'),
      message: StringValueObject.build(`The ID with value "${value}" is invalid`),
      status: IntegerValueObject.build(400),
      code: StringValueObject.build(ERROR_CODES['IdInvalidException']),
      errorType: ErrorType.error(),
      metadata: { value },
    });
  }
}
