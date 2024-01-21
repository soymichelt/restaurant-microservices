import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class RecipeNotFoundException extends DomainException {
  constructor(recipeId?: string) {
    super({
      name: StringValueObject.build('RecipeNotFoundException'),
      message: StringValueObject.build(`Recipe not found`),
      status: IntegerValueObject.build(404),
      code: StringValueObject.build(ERROR_CODES['RecipeNotFoundException']),
      errorType: ErrorType.error(),
      metadata: { recipeId },
    });
  }
}
