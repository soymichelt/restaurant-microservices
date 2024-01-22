import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class IngredientStockInvalidException extends DomainException {
  constructor(value: number) {
    super({
      name: StringValueObject.build('IngredientStockInvalidException'),
      message: StringValueObject.build(`Ingredient stock invalid. Stock must be greater than or equal to zero.`),
      status: IntegerValueObject.build(500),
      code: StringValueObject.build(ERROR_CODES['IngredientStockInvalidException']),
      errorType: ErrorType.error(),
      metadata: { value },
    });
  }
}
