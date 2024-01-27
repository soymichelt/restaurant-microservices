import { IngredientId } from '@services/ingredients/domain/valueObjects/ingredientId';
import { DomainException } from '@shared/domain/exceptions/baseException';
import { ERROR_CODES } from '@shared/domain/exceptions/errorsCode';
import { ErrorType } from '@shared/domain/valueObjects/errorTypeEnum';
import { IntegerValueObject } from '@shared/domain/valueObjects/integerValueObject';
import { StringValueObject } from '@shared/domain/valueObjects/stringValueObject';

export class IngredientNotFoundException extends DomainException {
  constructor(ingredientId: IngredientId) {
    super({
      name: StringValueObject.build('IngredientNotFoundException'),
      message: StringValueObject.build(`Ingredient not found.`),
      status: IntegerValueObject.build(404),
      code: StringValueObject.build(ERROR_CODES['IngredientNotFoundException']),
      errorType: ErrorType.error(),
      metadata: { ingredientId: ingredientId.value },
    });
  }
}
